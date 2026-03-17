import type { ReactNode } from "react";

export function LayoutContainer({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen px-4 pb-10 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </main>
  );
}
