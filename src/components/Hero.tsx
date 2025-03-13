export default function Hero() {
    return (
      <div className="relative hero min-h-screen">
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
        <div className="relative h-screen w-screen z-10 flex items-center justify-start text-left text-white px-[10%]">
          <div className="max-w-2xl">
            <h1 className="font-roboto mb-5 text-7xl font-bold uppercase italic">The fastest way to become a 
              <span className="text-orange-400"> better athlete</span>
            </h1>
            <p className="mb-5">
              Enter the colosseum, unleash your inner athlete.
            </p>
            <button className="btn btn-warning btn-lg">Get Started</button>
          </div>
        </div>
      </div>
    );
  }
  