interface Event {
  id: string;
  title: string;
  location: string;
  startDate: string;
  photo?: string;
  price: number;
}

interface EventCardProps {
  event: Event;
  purchasedEvents: string[];
}

export default function EventCard({ event, purchasedEvents }: EventCardProps) {
  const isPurchased = purchasedEvents.includes(event.id);

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: event.id }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="bg-stone-800 p-4 rounded-lg border border-white/10">
      {event.photo && (
        <div className="w-full h-48 overflow-hidden rounded-lg mb-3">
          <img
            src={event.photo}
            alt={event.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-sm text-white/70">{event.location}</p>
      <p className="text-sm text-white/50">
        {new Date(event.startDate).toLocaleDateString()}
      </p>
      {isPurchased ? (
        <p className="mt-3 text-green-400 font-semibold">You're attending!</p>
      ) : (
        <button
          onClick={handleCheckout}
          className="mt-3 bg-amber-400 text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-amber-300 cursor-pointer transition"
        >
          Purchase Access – ${event.price.toFixed(2)}
        </button>
      )}
    </div>
  );
}
