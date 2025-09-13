"use client"
import { useState } from "react";
import Image from "next/image";
import img from "../../public/images//promotion_video_Thummbnailbanner.jpg"

export default function PromotionVideo() {
    const [play, setPlay] = useState<boolean>(false);
    return (
        <>
            <div className="xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 container text-center mx-auto py-10 lg:py-12">
                <h4 className="font-poppins font-bold text-[16px] text-[#377DFF]">PROMOTION</h4>
                <p className="font-inter text-[34px] lg:text-[40px] max-w-[424px] mx-auto
                text-[#141718] leading-[44px] mb-4 mt-4 text-center w-full">Winter Collections</p>
                <p className="font-poppins lg:text-[20px] text-[16px] text-[#141718] mb-6">Introducing the new winter jackets.</p>


                <div className="aspect-video w-full lg:h-[544px] h-auto relative">
                    {!play ? (
                        <div
                            className="w-full h-full relative cursor-pointer"
                            onClick={() => setPlay(true)}
                        >
                            <Image
                                src={img}
                                alt="Video Thumbnail"
                                fill
                                className="object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
                                <button className="lg:w-16 lg:h-16 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none">
                                        <path d="M0.700195 3.38562C0.700195 1.03509 3.28069 -0.402389 5.27926 0.834823L17.5797 8.44937C19.4743 9.62221 19.4743 12.3781 17.5797 13.551L5.27926 21.1655C3.28069 22.4027 0.700195 20.9652 0.700195 18.6147V3.38562Z" fill="#232627" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <iframe
                            className="w-full h-full rounded-2xl"
                            src="https://www.youtube.com/embed/H5FAxTBuNM8?autoplay=1&loop=1&playlist=H5FAxTBuNM8&mute=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="autoplay; encrypted-media; fullscreen"
                            allowFullScreen
                        />
                    )}
                </div>
            </div>
        </>
    );
}

