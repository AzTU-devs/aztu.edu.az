#!/usr/bin/env bash
# Re-encode the hero videos to web-friendly sizes.
# Run from the repo root:  bash scripts/optimize-videos.sh
#
# Output goes to public/optimized/  (originals are NOT modified).
# Once you're happy with the result, upload the optimized files to your
# backend and reference them via the API URL — or replace the originals.
#
# Requires ffmpeg:  brew install ffmpeg

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install with: brew install ffmpeg" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT/public"
OUT_DIR="$ROOT/public/optimized"
mkdir -p "$OUT_DIR/heroVideos"

# 720p H.264 — small, smooth, plays everywhere.
# CRF 28 = visually transparent for a muted background loop. Drop to 26 for
# crisper detail (~1.5× the size); raise to 30 for even smaller files.
encode_h264_720() {
  local in="$1"
  local out="$2"
  echo "  → $out"
  ffmpeg -y -i "$in" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$out" \
    -hide_banner -loglevel error -stats
}

# Optional WebM (VP9). Smaller again on modern browsers. Slower to encode.
encode_webm() {
  local in="$1"
  local out="$2"
  echo "  → $out"
  ffmpeg -y -i "$in" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libvpx-vp9 -crf 34 -b:v 0 \
    -row-mt 1 \
    -an \
    "$out" \
    -hide_banner -loglevel error -stats
}

# Poster JPG — shown instantly while video downloads. Aim for ~50 KB.
extract_poster() {
  local in="$1"
  local out="$2"
  echo "  → $out"
  ffmpeg -y -i "$in" -ss 00:00:01 -frames:v 1 \
    -vf "scale='min(1600,iw)':-2" \
    -q:v 5 \
    "$out" \
    -hide_banner -loglevel error
}

shopt -s nullglob

VIDEOS=(
  "$SRC_DIR/aztu_intro.mp4"
  "$SRC_DIR/heroVideos/video1.mp4"
  "$SRC_DIR/heroVideos/video2.mp4"
  "$SRC_DIR/heroVideos/video5.mp4"
  "$SRC_DIR/heroVideos/video9.mp4"
)

echo "Encoding to 720p H.264 (mp4)…"
for src in "${VIDEOS[@]}"; do
  [ -f "$src" ] || { echo "  skip (missing): $src"; continue; }
  rel="${src#$SRC_DIR/}"
  dst="$OUT_DIR/${rel%.mp4}.mp4"
  mkdir -p "$(dirname "$dst")"
  encode_h264_720 "$src" "$dst"
done

echo
echo "Encoding to VP9 (webm) — optional, slower…"
for src in "${VIDEOS[@]}"; do
  [ -f "$src" ] || continue
  rel="${src#$SRC_DIR/}"
  dst="$OUT_DIR/${rel%.mp4}.webm"
  mkdir -p "$(dirname "$dst")"
  encode_webm "$src" "$dst"
done

echo
echo "Extracting poster from first video…"
extract_poster "${VIDEOS[0]}" "$OUT_DIR/hero-poster.jpg"

echo
echo "Done. Sizes:"
( cd "$OUT_DIR" && find . -type f -exec du -h {} \; | sort -k2 )

echo
echo "Next steps:"
echo "  1. Inspect the files in public/optimized/"
echo "  2. If they look good, upload them to your backend and update the"
echo "     hero video URLs to point at the new (small) files."
echo "  3. Replace HERO_POSTER in HeroSection.tsx with the new poster URL"
echo "     (e.g. /optimized/hero-poster.jpg or your backend URL)."
