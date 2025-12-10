"use client"
import { useState } from "react";
import Image from "next/image";
import img from "../../public/images/herobanner.jpg"
import { X } from "lucide-react";

export default function PromotionVideo() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <div className="xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 container text-center mx-auto py-10 lg:py-12">
                <h4 className="font-poppins font-bold text-[16px] text-[#377DFF]">PROMOTION</h4>
                <p className="font-inter text-[34px] lg:text-[40px] max-w-[424px] mx-auto
                text-[#141718] leading-[44px] mb-4 mt-4 text-center w-full">Winter Collections</p>
                <p className="font-poppins lg:text-[20px] text-[16px] text-[#141718] mb-6">Introducing the new winter jackets.</p>

                <div className="aspect-video w-full lg:h-[544px] h-auto relative">
                    <div
                        className="w-full h-full relative cursor-pointer"
                        onClick={openModal}
                    >
                        <Image
                            src={img}
                            alt="Video Thumbnail"
                            fill
                            className="object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
                            <button aria-label="Play video" className="lg:w-16 lg:h-16 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg animate-pulse cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none">
                                    <path d="M0.700195 3.38562C0.700195 1.03509 3.28069 -0.402389 5.27926 0.834823L17.5797 8.44937C19.4743 9.62221 19.4743 12.3781 17.5797 13.551L5.27926 21.1655C3.28069 22.4027 0.700195 20.9652 0.700195 18.6147V3.38562Z" fill="#232627" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={closeModal}
                    ></div>
                    
                    <div className="relative z-10 w-full max-w-4xl mx-auto">
                        <button
                            onClick={closeModal}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            aria-label="Close video"
                        >
                            <X width={24} height={24} color="#fff" cursor="pointer"/>
                        </button>
                        
                        <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/OaVsCM0Zeio?si=-6Cqq4bFwHI6nc19"
                                title="YouTube video player"
                                allow="autoplay; encrypted-media; fullscreen"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}