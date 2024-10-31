
// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Header from "./components/Header";
import DashboardSidebar from "./components/Dashboard";
import "./global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full">
        <SessionProvider>
          <Header />
          <div className="flex flex-col md:flex-row bg-blue min-h-screen">
            <DashboardSidebar />
            <div className="flex-grow min-h-screen">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
