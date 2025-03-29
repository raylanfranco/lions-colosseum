export default function ShopPage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-stone-950 to-stone-900 text-white px-8 py-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold uppercase text-amber-400 mb-6 drop-shadow">
          Gear Up
        </h1>
        <p className="text-lg text-white/70 mb-12">
          The shop opens soon — custom apparel, training journals, elite gear.
          Built for strength. Styled for war.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-white/10 bg-stone-800 text-left shadow hover:shadow-lg transition"
            >
              <div className="h-40 bg-stone-700 rounded mb-4 animate-pulse" />
              <h3 className="text-xl font-bold mb-2">Product Name</h3>
              <p className="text-sm text-white/60">
                Product description placeholder.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
