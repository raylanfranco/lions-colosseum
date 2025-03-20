import Image from "next/image";

export default function Join() {
  return (
    <section className="flex justify-center items-center bg-stone-950 pt-16 text-white">
      <div className=" w-full text-center lg:text-left px-[120px]">
        {/* Section Title */}
        <div className="flex items-center justify-center lg:justify-start mb-3">
          <div className="bg-amber-400 h-0.5 w-7" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest ml-3">
            Membership
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[3.63rem] leading-[3.88rem] italic font-bold uppercase mb-7">
          Join the Colosseum Today!
        </h1>

        {/* Description */}
        <p className="text-lg mb-9 max-w-lg mx-auto lg:mx-0">
          Experience elite training, expert coaching, and an unmatched
          atmosphere. Sign up today and take the first step toward a stronger,
          better you.
        </p>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-lg mx-auto lg:mx-0">
          <InputField type="text" placeholder="First Name" />
          <InputField type="text" placeholder="Last Name" />
          <InputField
            type="email"
            placeholder="Email"
            className="md:col-span-2"
          />
          <InputField
            type="tel"
            placeholder="Phone Number"
            className="md:col-span-2"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 border-2 border-white text-white text-sm font-medium uppercase tracking-widest py-4 px-8 transition hover:bg-white hover:text-black"
          >
            Submit
          </button>
        </form>
      </div>
      <Image
        src="/join.jpeg"
        alt="Welcome to the Colosseum"
        width={1162}
        height={853}
        className="h-full w-full object-cover"
        priority
      />
    </section>
  );
}

// 🔥 Reusable InputField Component
function InputField({
  type,
  placeholder,
  className = "",
}: {
  type: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-transparent border-2 border-white/[0.15] text-white py-4 px-5 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`}
    />
  );
}
