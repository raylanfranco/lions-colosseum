'use client;'

import Image from 'next/image';

export default function Navbar() {
    return(
        <nav className="fixed inset-x-auto top-0 right-0 flex-col items-center bg-transparent">
            <div className="flex w-full justify-between items-stretch border-b-[1px] border-b-[rgba(255, 255, 255, 0.15)] border-b-solid">
                <a href="#" className="flex px-[5px] py-[25px] justify-center flex-col border-r border-r-[rgba(255, 255, 255, 0.15)] transition-colors duration-200">
                    <Image 
                        src="/globe.svg"
                        height={32}
                        width={32}
                        alt="The logo for Lion's Colosseum"
                        className="object-contain"
                    />
                </a>
            </div>
        </nav>
    )
}