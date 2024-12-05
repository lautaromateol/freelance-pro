import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateList } from "@/features/lists/hooks/use-create-list";
import { Plus, X } from "lucide-react";
import { useState } from "react";

type Props = {
  projectId: string
}

export function AddListButton({ projectId }: Props) {

  const [isEditSession, setEditSession] = useState(false)
  const [value, setValue] = useState("")

  const { createList, isPending } = useCreateList()

  function onCreateList(name: string) {
    createList({
      name,
      projectId
    }, {
      onSuccess: () => {
        setValue("")
        setEditSession(false)
      }

    })
  }

  if (isEditSession) {
    return (
      <div className="flex flex-col space-y-1.5">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <div className="flex items-center">
          <Button
            onClick={() => onCreateList(value)}
            disabled={isPending}
            size="sm"
            variant="default"
            className="mr-2"
          >
            Create list
          </Button>
          <X onClick={() => setEditSession(false)} className="size-4" />
        </div>
      </div>
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
