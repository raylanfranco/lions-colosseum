'use client;'

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {


    return(
        <div className="navbar shadow-sm fixed z-50 py-[0] border-b border-b-neutral-100">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="uppercase menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="#">About</Link></li>
                    <li><Link href="#">Media</Link></li>
                    <li><Link href="#">Shop</Link></li>
                    <li><Link href="#">Contact</Link></li>
                </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-xl">Lion's Colosseum</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="uppercase menu menu-horizontal px-1">
                    <li className="px-6"><Link href="/" className="py-2 px-10">Home</Link></li>
                    <li className="px-6"><Link href="#" className="py-2 px-10">About</Link></li>
                    <li className="px-6"><Link href="#" className="py-2 px-10">Media</Link></li>
                    <li className="px-6"><Link href="#" className="py-2 px-10">Shop</Link></li>
                    <li className="px-6"><Link href="#" className="py-2 px-10">Contact</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-lg btn-outline">Log In</a>
            </div>
        </div>
    )
}