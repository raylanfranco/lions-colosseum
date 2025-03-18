export default function Hero() {
  return (
    <div className="relative hero min-h-screen place-items-start items-center">
      {/* Video Background */}
      <video
        muted
        loop
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="items-start box-border text-white/[0.65] flex-col justify-start leading-7 relative w-[41.88rem] flex px-[10%]">
        <div className="h-64 mb-6 w-[41.88rem]">
          <div className="h-20 w-[41.88rem] overflow-hidden">
            <h1
              className="text-white text-[5.00rem] leading-none italic font-bold h-20 leading-[5.38rem] relative uppercase w-[41.88rem]"
              style={{
                letterSpacing: "0px",
              }}
            >
              The Fastest Way to
            </h1>
          </div>
          <div className="h-20 w-[41.88rem] overflow-hidden">
            <h1
              className="text-white text-[5.00rem] leading-none italic font-bold h-20 leading-[5.38rem] relative uppercase w-[41.88rem]"
              style={{
                letterSpacing: "0px",
              }}
            >
              Become a <span className="text-amber-400 italic">Better</span>
            </h1>
          </div>
          <div className="h-20 w-[41.88rem] overflow-hidden">
            <h1
              className="text-white text-[5.00rem] leading-none italic font-bold h-20 leading-[5.38rem] relative uppercase w-[41.88rem]"
              style={{
                letterSpacing: "0px",
              }}
            >
              <span className="text-amber-400 italic">Athlete</span>
            </h1>
          </div>
        </div>
        <div className="h-16 mb-10 w-[32.50rem]">
          <div className="h-16 w-[32.50rem] overflow-hidden">
            <p className="text-lg h-16 leading-8 w-[32.50rem]">
              Train Hard. Get Strong. Conquer Every Challenge.
            </p>
          </div>
        </div>
        <div className="h-16 w-44 overflow-hidden">
          <a
            className="flex text-white cursor-pointer text-sm font-medium h-16 leading-5 py-2 px-2 text-center uppercase w-44 inline-block border-2 border-white border-solid content-center"
            style={{
              letterSpacing: "2px",
            }}
          >
            Join the Colosseum
          </a>
        </div>
      </div>
    </div>
  );
}
