import { InferResponseType } from "hono"
import { client } from "@/lib/client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskCard } from "./task-card"
import { AddTaskButton } from "./add-task-button"

type Project = InferResponseType<typeof client.api.projects[":id"]["$get"], 200>["data"]

type Props = {
  list: Project["List"][0]
}

export function ListCard({ list }: Props) {

  const tasks = list.Task ?? []

  return (
    <Card className="border w-72">
      <CardHeader className="-my-4 -mx-2">
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
      <CardFooter className="p-2">
        <AddTaskButton listId={list.id} />
      </CardFooter>
    </Card>
  )
}
