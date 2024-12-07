import { InferResponseType } from "hono"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { client } from "@/lib/client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskCard } from "./task-card"
import { AddTaskButton } from "./add-task-button"

type List = InferResponseType<typeof client.api.lists[":projectId"]["$get"], 200>["data"][0]
type Tasks = InferResponseType<typeof client.api.tasks[":projectId"]["$get"], 200>["data"]

type Props = {
  list: List,
  tasks: Tasks
}

export function ListCard({ list, tasks }: Props) {

  const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
    id: list.id,
    data: { type: "List", list }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="border w-72 min-h-[200px]"
      ></Card>
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex flex-col justify-between border w-72 min-h-[200px]"
    >
      <div>
        <CardHeader
          {...listeners}
          {...attributes}
          className="-my-4 -mx-2"
        >
          <CardTitle>
            <p className="text-sm">{list.name}</p>
          </CardTitle>
        </CardHeader>
        {tasks.length > 0 && (
          <CardContent className="p-2">
            <div className="space-y-1">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </CardContent>
        )}
      </div>
      <CardFooter className="p-2" data-drag-disabled>
        <AddTaskButton listId={list.id} />
      </CardFooter>
    </Card>
  )
}
