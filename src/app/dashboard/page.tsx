import { Suspense } from "react";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="text-white mt-32 text-center">Loading dashboard...</div>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
