"use client;";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@media (max-width: 767px) {\n/* DivMagic Note: Tailwind does not support max-width. We will fix this soon. */\n\n#a-1 {\npadding-left: 10px !important;\n}\n}\n@media (max-width: 991px) {\n/* DivMagic Note: Tailwind does not support max-width. We will fix this soon. */\n\n#nav-1 {\ndisplay: none !important;\n}\n}\n",
        }}
      />

      <div className="items-stretch border-b-white/[0.15] border-b-2 box-border text-white/[0.65] h-16 justify-between leading-7 w-full flex border-solid bg-stone-950">
        <a
          className="items-center border-r-white/[0.15] border-r-2 text-zinc-800 cursor-pointer flex-col float-left h-16 justify-center py-1.5 px-7 relative w-40 flex border-solid"
          id="a-1"
        >
          <img
            className="h-16 max-w-full align-middle w-24 inline-block overflow-clip"
            src="/logo.svg"
            style={{
              overflowClipMargin: "content-box",
            }}
          />
        </a>
        <div className="items-center h-16 justify-center w-[49.75rem] flex">
          <nav
            className="items-stretch float-right h-16 justify-center relative w-[45.38rem] flex"
            id="nav-1"
          >
            <div className="h-16 relative w-32 inline-block m-auto">
              <div
                className="items-center border-l-white/[0.15] border-l-2 text-white cursor-pointer text-sm font-medium h-full justify-center leading-5 py-7 px-8 relative text-center uppercase select-none w-32 flex border-solid m-auto"
                style={{
                  letterSpacing: "2px",
                }}
              >
                <div className="h-5 w-12">Home</div>
                <div className="text-xs h-4 leading-3 my-auto ml-1 relative w-4" />
              </div>
            </div>
            <div className="h-16 relative w-40 inline-block m-auto">
              <div
                className="items-center border-l-white/[0.15] border-l-2 text-white cursor-pointer text-sm font-medium h-full justify-center leading-5 py-7 px-8 relative text-center uppercase select-none w-40 flex border-solid m-auto"
                style={{
                  letterSpacing: "2px",
                }}
              >
                <div className="h-5 w-20">About</div>
                <div className="text-xs h-4 leading-3 my-auto ml-1 relative w-4" />
              </div>
            </div>
            <div className="h-16 relative w-32 inline-block m-auto">
              <div
                className="items-center border-l-white/[0.15] border-l-2 text-white cursor-pointer text-sm font-medium h-full justify-center leading-5 py-7 px-8 relative text-center uppercase select-none w-32 flex border-solid m-auto"
                style={{
                  letterSpacing: "2px",
                }}
              >
                <div className="h-5 w-12">Media</div>
                <div className="text-xs h-4 leading-3 my-auto ml-1 relative w-4" />
              </div>
            </div>
            <a
              className="items-center border-l-white/[0.15] border-l-2 text-white cursor-pointer text-sm font-medium h-16 justify-center leading-5 py-7 px-8 relative text-center uppercase w-28 flex border-solid m-auto"
              style={{
                letterSpacing: "2px",
              }}
            >
              Shop
            </a>
            <a
              className="items-center bg-amber-400 text-stone-950 cursor-pointer text-sm font-medium h-16 justify-center leading-5 py-7 px-8 text-center uppercase w-52 flex"
              style={{
                letterSpacing: "2px",
              }}
            >
              Become a Member
            </a>
          </nav>
          <div className="border-l-white/[0.15] border-l-2 h-full relative w-16 inline-block border-solid">
            <a
              className="items-center text-white cursor-pointer h-full justify-center max-w-full min-w-[4.25rem] relative w-16 flex p-3"
            >
              <img
                className="h-5 max-w-full align-middle w-5 inline-block overflow-clip"
                src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/608c8a4078749877bf5d7b95_cart.svg"
                style={{
                  overflowClipMargin: "content-box",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
