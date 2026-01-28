import { AnnouncementInterface, getAnnouncements } from '@/services/announcementService/announcementService';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { tree } from 'next/dist/build/templates/app-page';
import { useEffect, useState } from 'react';

export default function Announcements() {
    const [end, setEnd] = useState(4);
    const [start, setStart] = useState(0);
    const [loading, setLoading] = useState(false);
    const [announcements, setAnnouncements] = useState<AnnouncementInterface[]>([]);

    useEffect(() => {
        setLoading(true);

        getAnnouncements(start, end)
            .then((res) => {
                if (Array.isArray(res)) {
                    setAnnouncements(res);
                    console.log(res);
                } else {
                    setAnnouncements([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    console.log(announcements);
    

    return (
        <section className="px-4 md:px-10 lg:px-20 py-10 bg-[#1a2355] mt-[20px]">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Announcements</h2>
                <button className="group flex items-center gap-2 bg-white py-2 px-4 rounded-xl text-[#1a2355] font-bold cursor-pointer transition-all duration-300">
                    ALL NEWS
                    <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>

            {/* Announcement Cards */}
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                {announcements.map((announcement, idx) => (
                    <div 
                        key={idx}
                        className="flex items-center justify-start bg-white/30 rounded-[20px] p-4 md:p-5 h-[100px] flex-1 min-w-[250px] max-w-[100%] md:max-w-none"
                    >
                        <div className='bg-white/20 p-2 md:p-3 rounded-[10px] w-[80px] md:w-[100px] h-[60px] md:h-[70px] text-center font-bold text-white mr-4 md:mr-5 flex items-center justify-center'>
                            {announcement.created_at}
                        </div>
                        <h3 className='text-white font-bold text-sm md:text-base'>
                            {announcement.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}
