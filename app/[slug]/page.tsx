import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BranchPage } from "@/components/BranchPage";
import { branchPages, branchPagesBySlug } from "@/lib/branch-content";

type BranchRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return branchPages.map((branch) => ({ slug: branch.slug }));
}

export function generateMetadata({ params }: BranchRouteProps): Metadata {
  const branch = branchPagesBySlug[params.slug];

  if (!branch) {
    return {
      title: "Not Found | Mimicorp Systems"
    };
  }

  return {
    title: `${branch.title} | Mimicorp Systems`,
    description: branch.intro
  };
}

export default function BranchRoutePage({ params }: BranchRouteProps) {
  const branch = branchPagesBySlug[params.slug];

  if (!branch) {
    notFound();
  }

  return <BranchPage branch={branch} />;
}
