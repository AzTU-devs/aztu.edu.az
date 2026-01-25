import AzTULogoLight from "@/../public/logo/aztu-logo-light.png";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#5A9BD3]">
            <div className="relative flex flex-col items-center gap-6 text-center">
                <div className="flex items-center justify-center z-10 bg-white/20 animate-pulse p-[50px] rounded-[100%] w-[300px] h-[300px]">
                    <Image
                        src={AzTULogoLight}
                        alt="Azərbaycan Texniki Universiteti"
                        width={150}
                        priority
                        className="z-[20]"
                    />
                </div>

                <h1 className="text-white text-xl md:text-2xl font-semibold z-10">
                    Azərbaycan Texniki Universitetinə xoş gəlmişsiniz
                </h1>
            </div>
        </div>
    );
}
