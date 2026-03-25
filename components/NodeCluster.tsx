"use client";

import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useMemo, useState } from "react";

import { ConnectionLine } from "@/components/ConnectionLine";
import { Node } from "@/components/Node";
import { easing, motionTiming, staggerMax, staggerStep } from "@/lib/motion";
import { nodesById, systemNodes, type SystemNode } from "@/lib/system-data";

const WIDTH = 1200;
const HEIGHT = 900;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

type PositionedNode = SystemNode & {
  x: number;
  y: number;
};

function polarToCartesian(radius: number, angle: number) {
  return {
    x: CENTER.x + radius * Math.cos(angle),
    y: CENTER.y + radius * Math.sin(angle)
  };
}

function distribute(ids: string[], radius: number, offset = -Math.PI / 2) {
  if (ids.length === 0) {
    return [];
  }

  return ids.map((id, index) => {
    const angle = offset + (Math.PI * 2 * index) / ids.length;
    return { id, ...polarToCartesian(radius, angle) };
  });
}

function getPositions(focusId: string): PositionedNode[] {
  const focusNode = nodesById[focusId];
  const neighbors = focusNode.connections;
  const outer = systemNodes
    .map((node) => node.id)
    .filter((id) => id !== focusId && !neighbors.includes(id));

  const placed = new Map<string, { x: number; y: number }>();
  placed.set(focusId, CENTER);

  distribute(neighbors, 220).forEach((point) => {
    placed.set(point.id, { x: point.x, y: point.y });
  });

  distribute(outer, 350, -Math.PI / 2 + Math.PI / 8).forEach((point) => {
    placed.set(point.id, { x: point.x, y: point.y });
  });

  return systemNodes.map((node) => ({
    ...node,
    ...placed.get(node.id)!
  }));
}

export function NodeCluster() {
  const [focusedId, setFocusedId] = useState("mimicorp");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const deferredHover = useDeferredValue(hoveredId);
  const activeId = deferredHover ?? focusedId;
  const activeNode = nodesById[focusedId];

  const positions = useMemo(() => getPositions(focusedId), [focusedId]);
  const activeConnections = nodesById[activeId].connections;

  const lines = useMemo(() => {
    const unique = new Map<string, { source: string; target: string }>();

    systemNodes.forEach((node) => {
      node.connections.forEach((target) => {
        const key = [node.id, target].sort().join(":");
        unique.set(key, { source: node.id, target });
      });
    });

    return Array.from(unique.values());
  }, []);

  const directRelated = new Set([activeId, ...activeConnections]);
  const neighbors = activeNode.connections.map((id) => nodesById[id]);
  const branchFlow = neighbors.filter((node) => node.kind !== "core");

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <motion.div
        className="composition-shell overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionTiming.structural, ease: easing.primary }}
      >
        <div className="relative aspect-[16/12] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),rgba(0,0,0,0)_34%),radial-gradient(circle_at_18%_20%,rgba(0,213,255,0.08),transparent_20%),radial-gradient(circle_at_82%_24%,rgba(255,0,76,0.08),transparent_18%),rgba(0,0,0,0.6)]">
          <div className="cluster-calibration cluster-calibration-x" />
          <div className="cluster-calibration cluster-calibration-y" />
          <div className="orbital-ring ambient-shift h-[28%] w-[28%]" />
          <div className="orbital-ring ambient-counter h-[52%] w-[52%]" />
          <div className="orbital-ring ambient-shift h-[78%] w-[78%]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_18%_20%,rgba(0,213,255,0.08),transparent_18%),radial-gradient(circle_at_80%_78%,rgba(255,230,0,0.07),transparent_18%)]" />

          <motion.div
            className="absolute inset-0"
            animate={{ scale: focusedId === "mimicorp" ? 1 : 1.06 }}
            transition={{ duration: motionTiming.primary, ease: easing.expressive }}
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              aria-hidden="true"
            >
              {lines.map((line) => {
                const source = positions.find((node) => node.id === line.source)!;
                const target = positions.find((node) => node.id === line.target)!;
                const active =
                  line.source === activeId ||
                  line.target === activeId ||
                  (directRelated.has(line.source) && directRelated.has(line.target));

                const dimmed =
                  hoveredId !== null &&
                  !active &&
                  line.source !== hoveredId &&
                  line.target !== hoveredId;

                return (
                  <ConnectionLine
                    key={`${line.source}-${line.target}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    active={active}
                    dimmed={dimmed}
                  />
                );
              })}
            </svg>

            {positions.map((node, index) => {
              const related = directRelated.has(node.id);
              const dimmed = hoveredId !== null && !related;

              return (
                <motion.div
                  key={node.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: motionTiming.primary,
                    delay: Math.min(index * staggerStep, staggerMax),
                    ease: easing.expressive
                  }}
                >
                  <Node
                    node={node}
                    x={(node.x / WIDTH) * 100}
                    y={(node.y / HEIGHT) * 100}
                    isFocused={focusedId === node.id}
                    isRelated={related}
                    isDimmed={dimmed}
                    onHover={setHoveredId}
                    onFocus={(id) => {
                      startTransition(() => {
                        setFocusedId(id);
                        setHoveredId(null);
                      });
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <div className="absolute left-4 top-4 space-y-2 sm:left-6 sm:top-6">
            <p className="text-[12px] uppercase tracking-[0.28em] text-text/48">
              System map / second step
            </p>
            <p className="max-w-xs text-[16px] leading-[1.5] text-text/70">
              Use this after you&apos;ve picked a path above. Hover to preview a part of the
              system, then click any node to see what it does and what it connects to.
            </p>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6 sm:right-6">
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-text/50">
              click a node for details
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-text/74">
              connected items stay highlighted
            </span>
          </div>
        </div>
      </motion.div>

      <motion.aside
        className="space-y-4 rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5 backdrop-blur-sm"
        key={focusedId}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionTiming.structural, ease: easing.primary }}
      >
        <div className="space-y-3">
          <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">
            Selected item
          </p>
          <h2 className="font-primary text-[36px] leading-[1.15] tracking-[-0.04em]">
            {activeNode.label}
          </h2>
          <p className="text-[12px] uppercase tracking-[0.28em] text-text/48">
            {activeNode.orbitLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-text/52">
              focus id / {activeNode.id}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-text/74">
              strategic links / {activeNode.connections.length}
            </span>
          </div>
          <p className="text-[16px] leading-[1.5] text-text/72">{activeNode.summary}</p>
          <p className="text-[16px] leading-[1.5] text-text/60">{activeNode.detail}</p>
        </div>

        <div className="space-y-3 border-t border-white/8 pt-4">
          <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">
            Connected parts
          </p>
          <div className="space-y-2">
            <p className="text-[16px] leading-[1.5] text-text/78">
              You&apos;re viewing: {activeNode.label}
            </p>
            <p className="text-[16px] leading-[1.5] text-text/60">
              The items below are the nearest links in the system, so you can understand the
              relationship before exploring the wider map.
            </p>
          </div>
          <div className="space-y-2">
            {branchFlow.map((node) => (
              <motion.div
                key={node.id}
                className="flex items-center justify-between gap-4 border-b border-white/6 pb-2 text-[12px] uppercase tracking-[0.2em] text-text/70 last:border-b-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionTiming.structural, ease: easing.primary }}
              >
                <span>{node.label}</span>
                <span className="text-text/40">{node.kind}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/8 pt-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">How to use it</p>
          <p className="mt-3 font-accent text-[24px] leading-[1.15] text-text/68">
            Start with one familiar branch, then follow the links.
          </p>
        </div>
      </motion.aside>
    </section>
  );
}
