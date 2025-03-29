import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full bg-stone-950 min-h-screen text-white">
        {children}
      </main>
    </div>
  );
}
