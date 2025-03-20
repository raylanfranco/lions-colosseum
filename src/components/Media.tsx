import Image from "next/image";

export default function Media() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-neutral-900 text-white">
      {/* Content Section */}
      <div className="flex flex-col justify-center px-6 md:px-32 py-32">
        {/* Section Title */}
        <div className="flex items-center mb-3">
          <div className="bg-amber-400 h-0.5 w-7" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest ml-3">
            Fitness Class
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[2.63rem] leading-[2.88rem] italic font-bold uppercase mb-7 max-w-xl">
          Get insight into the club and learn what to expect
        </h2>

        {/* Description */}
        <p className="text-lg mb-9 max-w-lg">
          Get the strength workouts, cardio equipment, group exercise classes,
          and personal training support you need to crush your fitness goals.
          Are you in?
        </p>

        {/* Play Video Button */}
        <PlayVideoButton />
      </div>

      {/* Image Section */}
      <div className="relative border-l border-r border-white/15 overflow-hidden">
        <Image
          src="/chest_fly.jpeg"
          alt="Fitness Training"
          width={1162}
          height={775}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </section>
  );
}

// 🔥 Reusable Play Video Button Component
function PlayVideoButton() {
  return (
    <a className="flex items-center cursor-pointer group">
      {/* Video Thumbnail */}
      <div className="relative w-40 h-24 border-2 border-white/15 overflow-hidden transition group-hover:scale-105">
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full border-2 border-white/15 w-12 h-12 m-auto transition group-hover:bg-amber-400">
          <Image src="/play-arrow.svg" alt="Play Icon" width={24} height={24} />
        </div>

        {/* Thumbnail Image */}
        <Image
          src="/thumbnail.jpg"
          alt="Play Video"
          width={160}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Play Text */}
      <h3 className="text-4xl italic font-bold uppercase ml-6 transition group-hover:text-amber-400">
        Play Video
      </h3>
    </a>
  );
}
