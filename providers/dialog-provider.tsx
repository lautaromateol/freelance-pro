"use client"
import { useEffect, useState } from "react";
import { ProjectDetailDialog } from "@/features/projects/components/project-detail-dialog";
import { useOpenProjectDetail } from "@/features/projects/hooks/use-open-project-detail";

export function DialogProvider() {
  const { isOpen } = useOpenProjectDetail();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return isOpen ? <ProjectDetailDialog /> : null;
}

