import Image from "next/image";
import News1 from "@/../public/news/news-1.png";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function News() {
    const news = [
        {
            title: "Çankaya Universitetinin professoru AzTU-da seminar keçirib",
            desc: "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda seminar keçirib.",
            date: "22 January",
            category: "AzTU",
            image: News1
        },
        {
            title: "Çankaya Universitetinin professoru AzTU-da seminar keçirib",
            desc: "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda seminar keçirib.",
            date: "22 January",
            category: "AzTU",
            image: News1
        },
        {
            title: "Çankaya Universitetinin professoru AzTU-da seminar keçirib",
            desc: "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda seminar keçirib.",
            date: "22 January",
            category: "AzTU",
            image: News1
        },
        {
            title: "Çankaya Universitetinin professoru AzTU-da seminar keçirib",
            desc: "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda seminar keçirib.",
            date: "22 January",
            category: "AzTU",
            image: News1
        },
        {
            title: "Çankaya Universitetinin professoru AzTU-da seminar keçirib",
            desc: "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda seminar keçirib.",
            date: "22 January",
            category: "AzTU",
            image: News1
        }
    ];

    return (
        <section className="px-4 md:px-10 lg:px-20 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a2355] mb-4 md:mb-0">News</h2>
                <button className="transition-transform duration-800 group flex items-center gap-2 bg-[#1a2355] py-2 px-4 rounded-xl text-white font-bold cursor-pointer transition-all duration-300">
                    ALL NEWS
                    <ChevronRightIcon className="transition-transform duration-800 group-hover:translate-x-1" />
                </button>

            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Big News */}
                <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="w-full h-64 md:h-96 relative">
                        <Image src={news[0].image} alt={news[0].title} className="object-cover w-full h-full" fill />
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center px-4 py-6 gap-4 md:gap-6">
                        {/* Date & Category */}
                        <div className="flex flex-col items-start gap-4">
                            {/* Date */}
                            <div className="flex items-center justify-center bg-[#1a2355] rounded-xl w-24 h-24">
                                <p className="text-white font-bold text-center">{news[0].date}</p>
                            </div>
                            {/* Category */}
                            <div className="bg-[#ee7c7e] py-1 px-3 flex items-center justify-center rounded-lg">
                                <LocalOfferIcon sx={{ color: "white", marginRight: 1 }} />
                                <p className="text-white font-bold">{news[0].category}</p>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                            <h2 className="text-[#1a2355] font-bold text-xl md:text-2xl mb-2">{news[0].title}</h2>
                            <p className="text-[#1a2355] text-sm md:text-base">{news[0].desc}</p>
                        </div>
                    </div>
                </div>

                {/* Small News */}
                <div className="lg:w-1/2 flex flex-wrap gap-4">
                    {news.slice(1).map((newsItem, idx) => (
                        <div
                            key={idx}
                            className="flex-1 min-w-[48%] bg-white rounded-2xl shadow-lg overflow-hidden 
                 hover:bg-[#1a2355] hover:text-white transition-colors duration-300 cursor-pointer"
                        >
                            <div className="h-40 relative p-[10px]">
                                <Image
                                    src={newsItem.image}
                                    alt={newsItem.title}
                                    className="object-cover w-[100%] h-[100%] rounded-[10px]"
                                />
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <h2 className="font-bold text-sm md:text-base">{newsItem.title}</h2>
                                {/* Date & Category */}
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-1 text-sm md:text-base">
                                        <CalendarMonthIcon
                                            className="transition-colors duration-300"
                                            sx={{ color: "inherit" }}
                                        />
                                        <p className="font-bold">{newsItem.date}</p>
                                    </div>
                                    <div
                                        className="bg-[#ee7c7e] py-1 px-2 flex items-center justify-center rounded-lg
                       group-hover:bg-white transition-colors duration-300"
                                    >
                                        <LocalOfferIcon
                                            className="transition-colors duration-300"
                                            sx={{ color: "white", marginRight: 1 }}
                                        />
                                        <p className="font-bold text-xs md:text-sm text-white">{newsItem.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
