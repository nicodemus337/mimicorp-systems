import dynamic from "next/dynamic";

import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";
import { NodeCluster } from "@/components/NodeCluster";

const SystemNotes = dynamic(() => import("@/components/SystemNotes"));

export default function HomePage() {
  return (
    <LayoutContainer>
      <MotionWrapper className="space-y-12 pb-16 pt-6 md:space-y-16 md:pb-24 md:pt-10">
        <section className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">
                Overture
              </p>
              <h1 className="font-primary text-[52px] leading-[1.15] tracking-[-0.05em] text-text">
                mimicorp
              </h1>
            </div>

            <div className="max-w-sm space-y-2 text-[12px] uppercase tracking-[0.24em] text-text/48 md:text-right">
              <p>Single day system</p>
              <p>Node composition</p>
              <p>Continuous unfolding</p>
            </div>
          </div>

          <p className="max-w-xl text-[16px] leading-[1.5] text-text/72">
            A living structure of branches, stems, and fruit. Nothing here is a page.
            The system reorganizes around attention, and around what the land reports
            back.
          </p>
        </section>

        <NodeCluster />

        <SystemNotes />
      </MotionWrapper>
    </LayoutContainer>
  );
}
