import { InferResponseType } from "hono";
import { ListTodo } from "lucide-react"
import { client } from "@/lib/client";
import { ListCard } from "./list-card";
import { AddListButton } from "./add-list-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Project = InferResponseType<typeof client.api.projects[":id"]["$get"], 200>["data"]

type Props = {
  lists: Project["List"],
  projectId: string
}

export function ListsContainer({ projectId, lists }: Props) {

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ListTodo className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Project Tasks</h3>
      </div>
      <ScrollArea className="h-[200px] w-full">
        <div className="flex items-start gap-x-2">
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
          <AddListButton projectId={projectId} />
          <div className="flex-shrink-0 w-1" />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
