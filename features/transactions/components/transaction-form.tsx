import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema } from "@/schemas/transactions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DatePicker } from "@/components/date-picker"
import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AmountInput } from "@/components/amount-input"

type FormValues = z.input<typeof transactionSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (json: FormValues) => void
  onDelete?: () => void
  categoriesOptions: { label: string, value: string }[] | undefined
  onCreateCategory: (name: string) => void
  accountsOptions: { label: string, value: string }[] | undefined
  onCreateAccount: (name: string) => void,
  projectsOptions: { label: string, value: string }[] | undefined
  disabled: boolean
}

export function TransactionForm({ id, defaultValues, onSubmit, onDelete, disabled, categoriesOptions, onCreateCategory, accountsOptions, onCreateAccount, projectsOptions }: Props) {

  const form = useForm({
    resolver: zodResolver(transactionSchema),
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
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker date={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select or create a category"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  options={categoriesOptions}
                  onCreate={onCreateCategory}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select or create an account"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  options={accountsOptions}
                  onCreate={onCreateAccount}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select a project"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  options={projectsOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput onChange={field.onChange} value={field.value} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={disabled}>
          {id ? "Save changes" : "Add Transaction"}
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
