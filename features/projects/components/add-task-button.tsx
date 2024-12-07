/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ElementRef, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnClickOutside } from "usehooks-ts"
import { taskSchema } from "@/schemas/task";
import { useCreateTask } from "@/features/tasks/hooks/use-create-task";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  listId: string
}

type FormValues = z.input<typeof taskSchema>

export function AddTaskButton({ listId }: Props) {

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: "",
      listId
    }
  })

  const formRef = useRef<ElementRef<"form">>(null)

  const [isEditSession, setEditSession] = useState(false)

  const { createTask, isPending } = useCreateTask()

  useOnClickOutside(formRef, (() => {
    form.reset()
    setEditSession(false)
  }))

  function onInputKeydown(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  function handleSubmit(data: FormValues) {
    createTask(data, {
      onSuccess: () => {
        form.reset()
        setEditSession(false)
      }
    })
  }

  if (isEditSession) {
    return (
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-1.5">
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
          <div className="flex items-center">
            <Button
              disabled={isPending}
              size="sm"
              variant="default"
              className="mr-2"
            >
              Create task
            </Button>
            <X onClick={() => setEditSession(false)} className="size-4 cursor-pointer" />
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Button
      onClick={() => setEditSession(true)}
      variant="secondary"
      className="flex justify-start items-center w-full"
    >
      <Plus className="size-6" />
      <p className="font-medium">
        Add task
      </p>
    </Button>
  )
}
