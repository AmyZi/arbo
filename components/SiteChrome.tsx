"use client";

import { usePathname } from "next/navigation";

export default function SiteChrome({
  children,
  hideOn = ["/proposal"],
}: {
  children: React.ReactNode;
  hideOn?: string[];
}) {
  const pathname = usePathname();
  if (hideOn.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}