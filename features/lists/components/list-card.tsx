/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ElementRef, SetStateAction, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { InferResponseType } from "hono"
import { z } from "zod"
import { useOnClickOutside } from "usehooks-ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { client } from "@/lib/client"
import { listToUpdate } from "@/schemas/list"
import { useEditList } from "@/features/lists/hooks/use-edit-list"
import { useDeleteList } from "@/features/lists/hooks/use-delete-list"
import { TaskCard } from "@/features/tasks/components/task-card"
import { AddTaskButton } from "@/features/tasks/components/add-task-button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dropdown } from "@/components/dropdown"

type Lists = InferResponseType<typeof client.api.lists[":projectId"]["$get"], 200>["data"]
type Tasks = InferResponseType<typeof client.api.tasks[":projectId"]["$get"], 200>["data"]

type Props = {
  lists: Lists,
  tasks: Tasks,
  list: Lists[0],
  setOptimisticLists: Dispatch<SetStateAction<Lists>>,
  setOptimisticTasks: Dispatch<SetStateAction<Tasks>>
}

type FormValues = Omit<z.infer<typeof listToUpdate>, "id">

export function ListCard({
  lists,
  tasks,
  list,
  setOptimisticLists,
  setOptimisticTasks
}: Props) {

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])

  const { editList, isPending: isEditingList } = useEditList(list.id)
  const { deleteList, isPending: isDeletingList } = useDeleteList(list.id)

  const isPending = isEditingList || isDeletingList

  const [isEditSession, setIsEditSession] = useState(false)

  const form = useForm({
    resolver: zodResolver(listToUpdate.omit({ id: true })),
    defaultValues: {
      name: list.name
    }
  })

  const formRef = useRef<ElementRef<"form">>(null)

  function onOpen() {
    setIsEditSession(true)
  }

  function onClose() {
    form.reset()
    setIsEditSession(false)
  }

  function onDelete() {
    deleteList()
  }

  function onSubmit(data: FormValues) {
    const oldLists = [...lists]
    setOptimisticLists((lists) => lists.map((item) => item.id === list.id ? ({ ...list, name: data.name! }) : item))
    editList({
      name: data.name
    }, {
      onSuccess: () => {
        setIsEditSession(false)
      },
      onError: () => setOptimisticLists(oldLists)
    })
  }

  function onInputKeydown(e: any) {
    if (e.key === " ") {
      e.stopPropagation()
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit()
    }
  }

  useOnClickOutside(formRef, onClose)

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
      />
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
          {isEditSession ? (
            <Form {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input disabled={isPending} onPointerDown={(e) => e.stopPropagation()} onKeyDown={onInputKeydown} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <div className="flex items-center justify-between">
              <CardTitle>
                <p className="text-sm">{list.name}</p>
              </CardTitle>
              <Dropdown onOpen={onOpen} onDelete={onDelete} isPending={isPending} />
            </div>
          )}
        </CardHeader>
        {tasks.length > 0 && (
          <CardContent className="p-2">
            <div className="space-y-1">
              <SortableContext items={tasksIds}>
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    setOptimisticTasks={setOptimisticTasks}
                  />
                ))}
              </SortableContext>
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
