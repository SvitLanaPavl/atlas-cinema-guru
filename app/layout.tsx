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
          <div className='flex bg-blue'>
            <DashboardSidebar />
            {children} {/* This wraps all pages with SessionProvider */}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
