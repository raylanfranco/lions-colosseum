import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-25"></div>

      {/* Hero Content */}
      <div className="relative text-white/65 flex flex-col items-start px-[10%]">
        <h1 className="text-white text-[5rem] leading-[5.38rem] italic font-bold uppercase">
          The Fastest Way to <br />
          <span className="block">
            Become a <span className="text-amber-400 italic">Better</span>
          </span>
          <span className="block text-amber-400 italic">Athlete</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg mt-6">
          Train Hard. Get Strong. Conquer Every Challenge.
        </p>

        {/* CTA Button */}
        <Link
          href="/join"
          className="mt-10 inline-flex items-center justify-center h-16 w-44 border-2 border-white text-sm font-medium uppercase tracking-widest transition hover:bg-white hover:text-black"
        >
          Join the Colosseum
        </Link>
      </div>

      {/* Hero Bottom Cards */}
      <div className="w-screen grid grid-cols-3 gap-0 absolute bottom-0 hidden sm:grid">
        <HeroCard
          title="Classes"
          description="Push your limits in high-intensity group workouts led by elite trainers. Strength, endurance, and agility—master them all."
          imgSrc="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087279eae55b8446af5939d_icon_5.svg"
          link="#"
        />
        <HeroCard
          title="Training"
          description="Elite training programs tailored for peak performance and endurance."
          imgSrc="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087279ec433ac2a49bfa663_icon_2.svg"
          link="#"
        />
        <HeroCard
          title="Nutrition"
          description="Optimize your diet with expert-guided meal plans for peak results."
          imgSrc="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087279ecc559056af584d94_icon_1.svg"
          link="#"
        />
      </div>
    </section>
  );
}

// 🔥 Reusable Hero Card Component
function HeroCard({
  title,
  description,
  imgSrc,
  link,
}: {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="items-start box-border text-amber-400 cursor-pointer flex-col h-48 justify-start leading-7 w-full flex overflow-hidden py-12 px-20 bg-transparent 
      border-l-1 border-t-1 border-t-white/15 border-l-white/15 hover:bg-stone-900 transition"
    >
      <div className="flex items-center h-10 mb-4">
        <img className="h-9 mr-3 w-9" src={imgSrc} alt={`${title} icon`} />
        <h3 className="text-white text-4xl italic font-bold uppercase">
          {title}
        </h3>
      </div>
      <p className="text-white/[0.65] h-14">{description}</p>
    </Link>
  );
}
