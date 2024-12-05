/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { z } from "zod";
import { useOnClickOutside } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { listSchema } from "@/schemas/list";
import { useCreateList } from "@/features/lists/hooks/use-create-list";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  projectId: string
}

type FormValues = z.input<typeof listSchema>

export function AddListButton({ projectId }: Props) {

  const form = useForm({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: "",
      projectId
    }
  })

  const formRef = useRef<ElementRef<"form">>(null)

  const [isEditSession, setEditSession] = useState(false)

  const { createList, isPending } = useCreateList()

  useOnClickOutside(formRef, (() => {
    formRef.current?.reset()
    setEditSession(false)
  }))

  function onInputKeydown(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  function handleSubmit(data: FormValues) {
    createList(data, {
      onSuccess: () => setEditSession(false)
    })
  }

  if (isEditSession) {
    return (
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-1.5">
          <FormField
            control={form.control}
            name="name"
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
              Create list
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
      variant="default"
      className="flex justify-start items-center w-56"
    >
      <Plus className="size-6" />
      <p className="font-medium">
        Add list
      </p>
    </Button>
  )
}
