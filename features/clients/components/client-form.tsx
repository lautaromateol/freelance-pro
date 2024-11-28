"use client"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { clientSchema } from "@/schemas/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type FormValues = z.input<typeof clientSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (json: FormValues) => void
  onDelete?: () => void
  disabled: boolean
}

export function ClientForm({ id, defaultValues, onSubmit, onDelete, disabled }: Props) {

  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues
  })

  function handleSubmit(data: FormValues) {
    onSubmit(data)
  }

  function handleDelete() {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2 py-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client name</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="eg. Tools and Software, Workspace, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-2"
          disabled={disabled}
        >
          {id ? "Save changes" : "Add client"}
        </Button>
      </form>
      {!!id && (
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={handleDelete}
          disabled={disabled}
        >
          <Trash className="size-4" />
        </Button>
      )}
    </Form>
  )
}