import * as React from "react";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1 pt-[68px]">{children}</main>
      <Footer />
    </div>
  );
}
