import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { InferResponseType } from "hono";
import { ListTodo } from "lucide-react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { useUpdateOrders } from "@/features/lists/hooks/use-update-orders";
import { client } from "@/lib/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ListCard } from "./list-card";
import { AddListButton } from "./add-list-button";
import { useGetLists } from "@/features/lists/hooks/use-get-lists";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { Skeleton } from "@/components/ui/skeleton";

type List = InferResponseType<typeof client.api.lists[":projectId"]["$get"], 200>["data"][0]

type Props = {
  projectId: string
}

export function ListsContainer({ projectId }: Props) {

  const listsQuery = useGetLists(projectId)
  const tasksQuery = useGetTasks(projectId)

  const lists = useMemo(() => listsQuery.data ?? [], [listsQuery.data])
  const tasks = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data])

  const sortedLists = useMemo(() => lists.sort((a, b) => a.order - b.order), [lists])
  const listsIds = useMemo(() => lists.map((list) => list.id), [lists])

  const [optimisticLists, setOptimisticLists] = useState(sortedLists)
  const [activeList, setActiveList] = useState<List | null>(null)

  const { updateOrders, isPending } = useUpdateOrders()

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    // setActiveTask(null)
    setActiveList(null)
    const { active, over } = event

    if (!over) {
      return
    }

    const activeListId = active.id
    const overListId = over.id

    if (activeListId === overListId) {
      return
    }

    const activeListIndex = sortedLists.findIndex((list) => list.id === activeListId)
    const overListIndex = sortedLists.findIndex((list) => list.id === overListId)

    if (activeListIndex === -1 || overListIndex === -1) {
      return
    }

    const reorderedLists = arrayMove(sortedLists, activeListIndex, overListIndex).map((item, index) => ({ ...item, order: index + 1 })).sort((a, b) => a.order - b.order)

    setOptimisticLists(reorderedLists)

    const reorderedListsFiltered = reorderedLists
      .map((list) => ({
        id: list.id,
        order: list.order
      }))

    onUpdateOrders(reorderedListsFiltered)
  }

  function onUpdateOrders(
    lists: {
      id: string;
      order: number;
    }[]) {
    updateOrders({ lists }, {
      onError: () => setOptimisticLists(sortedLists)
    })
  }

  useEffect(() => {
    setOptimisticLists(sortedLists)
  }, [sortedLists])


  if (listsQuery.isLoading || tasksQuery.isLoading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Project Tasks</h3>
        </div>
        <div className="flex items-start gap-x-2">
          <Skeleton className="w-72 min-h-[200px]" />
          <Skeleton className="w-72 min-h-[200px]" />
          <Skeleton className="w-72 min-h-[200px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ListTodo className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Project Tasks</h3>
      </div>
      <ScrollArea className="h-[200px] w-full">
        <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <div className="flex items-start gap-x-2">
            <SortableContext disabled={isPending} items={listsIds}>
              {optimisticLists.map((list) => (
                <ListCard key={list.id} list={list} tasks={tasks.filter((task) => task.listId === list.id)} />
              ))}
            </SortableContext>
            <AddListButton projectId={projectId} />
            <div className="flex-shrink-0 w-1" />
          </div>
          {createPortal(
            <DragOverlay>
              {activeList && (
                <ListCard list={activeList} tasks={tasks.filter((task) => task.listId === activeList.id)} />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
