"use client"
import { useOpenProjectDetail } from "@/features/projects/hooks/use-open-project-detail";
import { useGetProject } from "@/features/projects/api/use-get-project"
import { ProjectDetail } from "@/features/projects/components/project-detail";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function ProjectDetailDialog() {

  const { id, isOpen, onClose } = useOpenProjectDetail()
  const { data: project, isLoading } = useGetProject(id)

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-6 w-1/2" />
          </DialogHeader>
          <Loader2 className="size-4 animate-spin" />
        </DialogContent>
      </Dialog>
    )
  }

  if (project) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <ProjectDetail project={project}>
          <DialogContent className="overflow-y-auto max-h-[45rem]">
            <ProjectDetail.Header />
            <ProjectDetail.Content />
          </DialogContent>
        </ProjectDetail>
      </Dialog>
    )
  }

  return null
}
