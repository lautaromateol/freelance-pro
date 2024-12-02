"use client"
import { useOpenProjectDetail } from "@/features/projects/hooks/use-open-project-detail";
import { useGetProject } from "@/features/projects/api/use-get-project"
import { ProjectDetail } from "@/features/projects/components/project-detail";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function ProjectDetailDialog() {

  const { id, isOpen, onClose } = useOpenProjectDetail()
  const { data: project, isLoading } = useGetProject(id)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-6 w-1/2" />
            </>
          ) : (
            <>
              <DialogTitle>{project?.name}</DialogTitle>
              <DialogDescription>Belongs to <span className="underline">{project?.client.name}</span></DialogDescription>
            </>
          )}
        </DialogHeader>
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            {project && (
              <ProjectDetail project={project} />
            )}
          </>
        )
        }
      </DialogContent>
    </Dialog>
  )
}
