// app/about/page.tsx
import Image from "next/image";
import lionBg from "../../../public/lion-bg.jpg"; // replace with your hero image
import gymColosseum from "../../../public/gym-colosseum.jpg"; // replace with your second image

export default function About() {
  return (
    <section className="text-white bg-black min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={lionBg}
          alt="Lion Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-amber-400 uppercase tracking-widest text-center z-10">
            Our Legacy
          </h1>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6 py-16 items-center">
        <Image
          src={gymColosseum}
          alt="Gym Colosseum"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold text-amber-400 uppercase mb-4">
            From Vision to Reality
          </h2>
          <p className="text-white/90 leading-relaxed">
            Lion’s Colosseum began as a vision — to create a modern arena where
            gym-goers of every level could push past personal limits, challenge
            others, and belong to a like-minded tribe. The lion was chosen as
            our emblem not just for its raw power, but for its role as a leader,
            a guardian, and a symbol of pride. Our Colosseum isn’t built of
            stone — it’s built of sweat, unity, and ambition.
          </p>
        </div>
      </div>

      {/* Symbolism + Quote */}
      <div className="text-center px-6 pb-20">
        <h3 className="text-xl uppercase tracking-widest text-white/70 mb-6">
          Strength. Unity. Pride.
        </h3>
        <p className="italic text-white/50 max-w-xl mx-auto">
          “Strength is forged through struggle.”
        </p>
      </div>
    </section>
  );
}
