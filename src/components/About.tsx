import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="w-screen flex flex-col lg:flex-row bg-neutral-900">
      {/* Image Section */}
      <div className="flex-1">
        <Image
          src="/about.jpeg"
          alt="Welcome to the Colosseum"
          width={1162}
          height={853}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-16 text-white">
        {/* Section Title */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-amber-400 h-0.5 w-7" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">
            Welcome
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[2.63rem] leading-[2.88rem] italic font-bold uppercase mb-7 max-w-xl">
          Dedicated to igniting your passion for health
        </h2>

        {/* Description */}
        <p className="text-lg leading-8 mb-9 max-w-lg">
          Born from a desire to elevate the everyday gym experience, Lion’s
          Colosseum is where strength meets spirit. A space for community,
          competition, and constant growth.
        </p>

        {/* Call to Action */}
        <Link
          href="#"
          className="border-2 border-white text-white text-sm font-medium uppercase tracking-widest px-8 py-4 transition hover:bg-white hover:text-black w-36 text-center"
        >
          About Us
        </Link>
      </div>
    </section>
  );
}
