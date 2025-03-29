export default function Footer() {
  return (
    <footer className="w-full bg-stone-950 text-white text-sm py-6 mt-auto border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <span>© {new Date().getFullYear()} Lion’s Colosseum</span>
        <div className="space-x-4">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/media" className="hover:underline">
            Media
          </a>
          <a href="/shop" className="hover:underline">
            Shop
          </a>
        </div>
      </div>
    </footer>
  );
}
