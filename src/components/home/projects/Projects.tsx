import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Projects() {
    return (
        <section className="px-4 md:px-10 lg:px-20 py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a2355] mb-4 md:mb-0">Projects</h2>
                <button className="transition-transform duration-800 group flex items-center gap-2 bg-[#1a2355] py-2 px-4 rounded-xl text-white font-bold cursor-pointer transition-all duration-300">
                    ALL PROJECTS
                    <ChevronRightIcon className="transition-transform duration-800 group-hover:translate-x-1" />
                </button>

            </div>
        </section>
    )
}