"use client";

import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  fullName: string;
  title?: string;
  academicDegree?: string;
  department?: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  cvUrl?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function PersonCard({
  fullName,
  title,
  academicDegree,
  department,
  photoUrl,
  email,
  phone,
  cvUrl,
  size = "md",
  href,
}: Props) {
  const avatarSize =
    size === "lg" ? "w-28 h-28" : size === "sm" ? "w-14 h-14" : "w-20 h-20";
  const iconSize = size === "lg" ? 48 : size === "sm" ? 24 : 36;

  const cardContent = (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow${href ? " cursor-pointer hover:border-[#1a2355]/30 dark:hover:border-[#1a2355]/40" : ""}`}>
      {/* Avatar */}
      <div
        className={`${avatarSize} rounded-full bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center overflow-hidden flex-shrink-0`}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <PersonIcon sx={{ fontSize: iconSize, color: "#1a2355" }} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-bold text-[#1a2355] dark:text-white text-sm leading-snug">
          {fullName}
        </p>
        {academicDegree && (
          <p className="text-xs text-[#ee7c7e] font-medium mt-0.5">
            {academicDegree}
          </p>
        )}
        {title && (
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {title}
          </p>
        )}
        {department && (
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
            {department}
          </p>
        )}
      </div>

      {/* Contact & CV */}
      {(email || phone || cvUrl) && (
        <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 hover:text-[#1a2355] dark:hover:text-white transition-colors"
              title={email}
            >
              <EmailIcon sx={{ fontSize: 14 }} />
              <span className="truncate max-w-[120px]">{email}</span>
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 hover:text-[#1a2355] dark:hover:text-white transition-colors"
            >
              <PhoneIcon sx={{ fontSize: 14 }} />
              {phone}
            </a>
          )}
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#ee7c7e] hover:text-[#d96b6d] transition-colors font-semibold"
            >
              <DownloadIcon sx={{ fontSize: 14 }} />
              CV
            </a>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }
  return cardContent;
}
