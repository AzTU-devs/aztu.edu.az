"use client";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { getImageUrl } from "@/services/researchInstituteService/researchInstituteService";
import type { ResearchInstituteStaff } from "@/types/researchInstitute";

interface StaffCardProps {
  staff: ResearchInstituteStaff;
}

export default function ResearchInstituteStaffCard({ staff }: StaffCardProps) {
  const imageUrl = getImageUrl(staff.image_url);

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_-6px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-1">
      {/* Avatar with decorative ring */}
      <div className="relative p-1 rounded-full border-2 border-dashed border-[#ee7c7e]/30 group-hover:border-[#ee7c7e] transition-colors duration-500">
        <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-slate-700 overflow-hidden shadow-inner">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={staff.full_name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#1a2355]/20">
              <PersonIcon sx={{ fontSize: 48 }} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <p className="font-black text-[#1a2355] dark:text-white text-base leading-tight">
          {staff.full_name}
        </p>
        <p className="text-[10px] text-[#ee7c7e] font-black uppercase tracking-widest">
          {staff.title}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-2 w-full pt-4 border-t border-gray-50 dark:border-slate-700/50 justify-center">
        {staff.email && (
          <a
            href={`mailto:${staff.email}`}
            className="w-8 h-8 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center text-[#1a2355] dark:text-white hover:bg-[#ee7c7e] hover:text-white transition-all duration-300"
            title={staff.email}
          >
            <EmailIcon sx={{ fontSize: 16 }} />
          </a>
        )}
        {staff.phone && (
          <a
            href={`tel:${staff.phone}`}
            className="w-8 h-8 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center text-[#1a2355] dark:text-white hover:bg-[#1a2355] hover:text-white transition-all duration-300"
            title={staff.phone}
          >
            <PhoneIcon sx={{ fontSize: 16 }} />
          </a>
        )}
      </div>
    </div>
  );
}
