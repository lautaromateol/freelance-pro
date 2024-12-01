import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema } from "@/schemas/project"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DatePicker } from "@/components/date-picker"
import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormValues = z.input<typeof projectSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (json: FormValues) => void
  onDelete?: () => void
  clientsOptions: { label: string, value: string }[] | undefined
  onCreateClient: (name: string) => void
  disabled: boolean
}

export function ProjectForm({ id, defaultValues, onSubmit, onDelete, disabled, clientsOptions, onCreateClient }: Props) {

  const form = useForm({
    resolver: zodResolver(projectSchema),
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
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <DatePicker date={field.value ?? undefined} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select or create a client"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  options={clientsOptions}
                  onCreate={onCreateClient}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={disabled}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input disabled={disabled} type="number" {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={disabled}>
          {id ? "Save changes" : "Add Project"}
        </Button>
      </form>
      {!!id && (
        <Button
          className="w-full"
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
