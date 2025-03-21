import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-stone-950 border-t-2 border-t-neutral-700 text-white py-32 px-5 flex flex-col items-center">
      {/* Section Title */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-amber-400 h-0.5 w-4" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest mx-3">
            Success Stories
          </span>
          <div className="bg-amber-400 h-0.5 w-4" />
        </div>
        <h2 className="text-[2.63rem] leading-[2.88rem] italic font-bold uppercase">
          What our members say
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-10 w-full max-w-6xl">
        <TestimonialCard
          name="Edward Davidson"
          review="Ut magna amet, a malesuada. Nibh in interdum at sem senectus pulvinar aliquam orci."
        />
        <TestimonialCard
          name="Abigayle Jordan"
          review="At diam blandit tellus neque fames nunc quisque magna. Venenatis pharetra eget quis iaculis non aliquam."
        />
        <TestimonialCard
          name="Leo Gibson"
          review="Duis non enim fermentum, viverra sit vulputate morbi. Non lorem morbi consectetur porta placerat cras at."
        />
      </div>

      {/* Call to Action */}
      <div
        className="relative mt-[50px] w-full max-w-6xl border-2 border-white/15 py-[3%] pr-[20%] pl-[3%] flex flex-col md:flex-col items-start justify-between bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/608c4e98eb03873de53e8ac3_banner_1.jpeg)",
        }}
      >
        <h2 className="text-[2.63rem] leading-[2.88rem] italic font-bold uppercase">
          Ready to get started?<br></br>{" "}
          <span className="text-amber-400 italic">Enter the Colosseum.</span>
        </h2>
        <a
          href="/join"
          className="mt-6 bg-transparent border-2 border-white text-sm font-medium uppercase tracking-widest py-4 px-6 hover:bg-white hover:text-black transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

// 🔥 Reusable Testimonial Card Component
function TestimonialCard({ name, review }: { name: string; review: string }) {
  return (
    <div className="border-2 border-white/15 p-8 text-center">
      {/* Star Rating */}
      <div className="flex justify-center mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Image
              key={i}
              src="/star.svg"
              alt="Star"
              width={24}
              height={24}
              className="mx-1"
            />
          ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-lg mb-5">{review}</p>

      {/* Name */}
      <h4 className="text-lg font-semibold">{name}</h4>
    </div>
  );
}
