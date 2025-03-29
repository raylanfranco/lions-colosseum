export default function MediaPage() {
  return (
    <main className="min-h-screen bg-stone-900 text-white px-8 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold uppercase tracking-widest mb-6 text-amber-400 drop-shadow-md">
          Media Vault
        </h1>
        <p className="text-lg text-white/70 mb-12">
          From behind-the-scenes rituals to front-line feats — this gallery
          captures the heartbeat of Lion’s Colosseum.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-video bg-stone-800 rounded-lg shadow-inner animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
