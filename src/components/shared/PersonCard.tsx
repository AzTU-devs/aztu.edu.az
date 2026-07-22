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
    size === "lg" ? "w-32 h-32" : size === "sm" ? "w-16 h-16" : "w-24 h-24";
  const iconSize = size === "lg" ? 56 : size === "sm" ? 28 : 44;

  const cardContent = (
    <div className={`group relative bg-white dark:bg-[#161f42] backdrop-blur-xl rounded-[18px] border-2 border-[#1a2355]/30 dark:border-white/10 p-4 flex flex-col items-center text-center gap-3 transition-all duration-500 hover:-translate-y-1 hover:border-[#ee7c7e] dark:hover:border-[#ee7c7e] hover:shadow-xl hover:shadow-[#1a2355]/20 dark:hover:shadow-black/40 overflow-hidden${href ? " cursor-pointer" : ""}`}>
      {/* Background Decorative Element */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#ee7c7e]/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700" />
      
      {/* Avatar */}
      <div
        className={`${avatarSize} rounded-full bg-gray-50 dark:bg-white/10 border-2 border-[#1a2355]/30 dark:border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 relative z-10 group-hover:border-[#ee7c7e]/50 transition-colors duration-500 shadow-sm`}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={fullName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <PersonIcon sx={{ fontSize: iconSize, color: "#1a2355", opacity: 0.15 }} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 relative z-10 w-full">
        <p className="font-black text-[#1a2355] dark:text-white text-sm leading-tight group-hover:text-[#ee7c7e] transition-colors break-words">
          {fullName}
        </p>
        {academicDegree && (
          <p className="text-[9px] uppercase tracking-wider text-[#ee7c7e] font-black mt-1 bg-[#ee7c7e]/5 px-2 py-0.5 rounded-full inline-block">
            {academicDegree}
          </p>
        )}
        {title && (
          <p className="text-xs text-[#1a2355] dark:text-white/80 font-black mt-2 leading-tight break-words">
            {title}
          </p>
        )}
      </div>

      {/* Contact & CV */}
      {(email || phone || cvUrl) && (
        <div className="flex items-center gap-2 mt-1 flex-wrap justify-center relative z-10">
          {email && (
            <a
              href={`mailto:${email}`}
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 border border-gray-100 dark:border-white/10"
              title={email}
            >
              <EmailIcon sx={{ fontSize: 16 }} />
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 border border-gray-100 dark:border-white/10"
              title={phone}
            >
              <PhoneIcon sx={{ fontSize: 16 }} />
            </a>
          )}
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-gray-50 dark:bg-white/10 flex items-center justify-center text-[#ee7c7e] hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 border border-gray-100 dark:border-white/10"
              title="Download CV"
            >
              <DownloadIcon sx={{ fontSize: 16 }} />
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
