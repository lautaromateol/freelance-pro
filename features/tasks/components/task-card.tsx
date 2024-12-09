/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ElementRef, SetStateAction, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { InferResponseType } from "hono"
import { z } from "zod"
import { useOnClickOutside } from "usehooks-ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEditTask } from "@/features/tasks/hooks/use-edit-task"
import { useDeleteTask } from "@/features/tasks/hooks/use-delete-task"
import { taskUpdateSchema } from "@/schemas/task"
import { client } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Tasks = InferResponseType<typeof client.api.tasks[":projectId"]["$get"], 200>["data"]
type Task = Tasks[0]

type Props = {
  tasks: Tasks
  task: Task,
  setOptimisticTasks: Dispatch<SetStateAction<Tasks>>
}

export function TaskCard({ tasks, task, setOptimisticTasks }: Props) {

  const { editTask, isPending: isEditingTask } = useEditTask(task.id)
  const { deleteTask, isPending: isDeletingTask } = useDeleteTask(task.id)


  const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
    id: task.id,
    data: { type: "Task", task }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const form = useForm({
    resolver: zodResolver(taskUpdateSchema.omit({ id: true })),
    defaultValues: {
      description: task.description
    }
  })

  const formRef = useRef<ElementRef<"form">>(null)

  const [isEditSession, setIsEditSession] = useState(false)

  const isPending = isDeletingTask || isEditingTask

  function onClose() {
    form.reset()
    setIsEditSession(false)
  }

  useOnClickOutside(formRef, onClose)

  function onInputKeydown(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  function onSubmit(data: Omit<z.infer<typeof taskUpdateSchema>, "id">) {
    const oldTasks = [...tasks]
    setOptimisticTasks((tasks) => tasks.map((item) => task.id === item.id ? { ...item, description: data.description! } : item))
    editTask({
      description: data.description
    }, {
      onSuccess: () => {
        setIsEditSession(false)
      },
      onError: () => setOptimisticTasks(oldTasks)
    })
  }

  function onDeleteTask() {
    deleteTask()
  }

  if (isDragging) {
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-neutral-100/60 hover:bg-neutral-100 p-2 rounded-md min-h-12 border"
    />
  }

  if (isEditSession) {
    return (
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input onKeyDown={onInputKeydown} disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center justify-between bg-neutral-100/60 hover:bg-neutral-100 p-2 rounded-md min-h-12"
    >
      <div
        className="flex-1"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => setIsEditSession(true)}
      >
        <p className="text-black/80 font-light hover:underline cursor-pointer">
          {task.description}
        </p>
      </div>
      <Button
        disabled={isPending}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onDeleteTask}
        variant="ghost"
        size="xs"
      >
        <Trash className="size-4" />
      </Button>
    </div>
  )
}
