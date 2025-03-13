export default function About() {
  return(
    <section className="bg-base-200 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-primary mb-6">Our Mission</h2>
        <p className="text-lg text-gray-600">
          At Lion’s Colosseum, we empower warriors to push their limits and forge their strength.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
        <div className="card bg-white shadow-lg p-6">
          <h3 className="text-xl font-bold">Elite Training</h3>
          <p>Custom workouts designed for peak performance.</p>
        </div>
        <div className="card bg-white shadow-lg p-6">
          <h3 className="text-xl font-bold">Top Coaches</h3>
          <p>Train under experts who’ve mastered the craft.</p>
        </div>
        <div className="card bg-white shadow-lg p-6">
          <h3 className="text-xl font-bold">Community</h3>
          <p>Join a network of dedicated athletes.</p>
        </div>
      </div>
    </section>
  )
}