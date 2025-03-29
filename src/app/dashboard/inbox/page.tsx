import Inbox from "@/components/Inbox";
import Sidebar from "@/components/Sidebar";

export default function InboxPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full bg-stone-950 min-h-screen text-white">
        <Inbox />
      </main>
    </div>
  );
}
