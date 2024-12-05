/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementRef, useRef, useState, useOptimistic } from "react"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { InferResponseType } from "hono"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEditTask } from "@/features/tasks/hooks/use-edit-task"
import { useDeleteTask } from "@/features/tasks/hooks/use-delete-task"
import { client } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { taskUpdateSchema } from "@/schemas/task"
import { Input } from "@/components/ui/input"
import { useOnClickOutside } from "usehooks-ts"

type Project = InferResponseType<typeof client.api.projects[":id"]["$get"], 200>["data"]

type List = Project["List"][0]

type Props = {
  task: List["Task"][0]
}

export function TaskCard({ task }: Props) {

  const { editTask, isPending: isEditingTask } = useEditTask(task.id)
  const { deleteTask, isPending: isDeletingTask } = useDeleteTask(task.id)

  const form = useForm({
    resolver: zodResolver(taskUpdateSchema),
    defaultValues: {
      description: task.description
    }
  })

  const formRef = useRef<ElementRef<"form">>(null)

  const [optimisticTask, setOptimisticTask] = useOptimistic(task, (state, description: string) => ({
    ...state,
    description,
  }))
  const [isEditSession, setIsEditSession] = useState(false)

  const isPending = isDeletingTask || isEditingTask

  function onInputKeydown(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  useOnClickOutside(formRef, (() => {
    formRef.current?.reset()
    setIsEditSession(false)
  }))

  function onSubmit(data: z.infer<typeof taskUpdateSchema>) {
    const original = optimisticTask.description
    setOptimisticTask(data.description!)

    editTask({
      description: data.description
    }, {
      onSuccess: () => {
        setIsEditSession(false)
        formRef.current?.reset()
      },
      onError:  () => setOptimisticTask(original)
    })
  }

  function onDeleteTask() {
    deleteTask()
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
    <div className="flex items-center justify-between bg-neutral-100/60 hover:bg-neutral-100 p-2 rounded-md">
      <p onClick={() => setIsEditSession(true)} className="text-black/80 font-light hover:underline cursor-pointer">
        {optimisticTask.description}
      </p>
      <Button
        disabled={isPending}
        onClick={onDeleteTask}
        variant="ghost"
        size="xs"
      >
        <Trash className="size-4" />
      </Button>
    </div>
  )
}
