import Image from "next/image";

export default function Services() {
  return (
    <section className="bg-stone-950 border-t-2 border-neutral-700 py-32 px-5 text-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <div className="flex justify-center items-center mb-3">
          <div className="bg-amber-400 w-7 h-0.5" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest ml-3">
            Services
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-white text-[2.63rem] leading-none italic font-bold uppercase max-w-2xl mx-auto mb-10">
          Helping You Reach Higher and Achieve More
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ServiceCard
            title="Competitions"
            description="From monthly lifts to full-scale tournaments, our competitions are designed to test your edge and ignite your fire. Win or lose — you’ll level up."
            imgSrc="/service-ph-1.jpg"
            iconSrc="/competition.svg"
            topMargin="sm"
          />
          <ServiceCard
            title="Training"
            description="Access expert programming, guided sessions, and on-demand routines tailored to your goals — whether it’s strength, endurance, or aesthetics."
            imgSrc="/service-ph-2.jpg"
            iconSrc="/winner.svg"
            topMargin="md"
          />
          <ServiceCard
            title="Nutrition"
            description="Fuel the machine. Our curated nutrition resources and partnerships provide everything from meal plans to macro coaching."
            imgSrc="/service-ph-3.jpg"
            iconSrc="/tire.svg"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  imgSrc,
  iconSrc,
  topMargin,
}: {
  title: string;
  description: string;
  imgSrc: string;
  iconSrc: string;
  topMargin?: "sm" | "md";
}) {
  const marginClass =
    topMargin === "sm" ? "mt-24" : topMargin === "md" ? "mt-12" : "";

  return (
    <div className="group">
      {/* Service Image */}
      <div
        className={`overflow-hidden border-2 border-white/[0.15] ${marginClass}`}
      >
        <Image
          src={imgSrc}
          alt={title}
          width={584}
          height={530}
          className="w-full h-[33.13rem] object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Service Title & Icon */}
      <div className="flex items-center mt-7 mb-4 justify-center">
        <Image src={iconSrc} alt={`${title} Icon`} width={28} height={28} />
        <h4 className="text-white text-3xl font-bold uppercase italic ml-3 cursor-pointer transition hover:text-amber-400">
          {title}
        </h4>
      </div>

      {/* Description */}
      <p className="text-white/65">{description}</p>
    </div>
  );
}
