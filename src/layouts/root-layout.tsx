import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="w-screen h-screen">
      <Outlet />
    </main>
  );
}
