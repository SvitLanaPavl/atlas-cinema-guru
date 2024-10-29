// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Header from "./components/Header";
import DashboardSidebar from "./components/Dashboard";
import "./global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          <div className="flex flex-col md:flex-row bg-blue">
            <DashboardSidebar />
            <div className="flex-grow">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
