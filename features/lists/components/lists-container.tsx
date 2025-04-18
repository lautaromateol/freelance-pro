import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { InferResponseType } from "hono";
import { ListTodo } from "lucide-react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { useGetLists } from "@/features/lists/hooks/use-get-lists";
import { useUpdateOrders } from "@/features/lists/hooks/use-update-orders";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { useUpdateTasksOrders } from "@/features/tasks/hooks/use-update-tasks-orders";
import { AddListButton } from "@/features/lists/components/add-list-button";
import { ListCard } from "@/features/lists/components/list-card";
import { TaskCard } from "@/features/tasks/components/task-card";
import { client } from "@/lib/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type List = InferResponseType<typeof client.api.lists[":projectId"]["$get"], 200>["data"][0]
type Task = InferResponseType<typeof client.api.tasks[":projectId"]["$get"], 200>["data"][0]

type Props = {
  projectId: string
}

export function ListsContainer({ projectId }: Props) {

  const listsQuery = useGetLists(projectId)
  const tasksQuery = useGetTasks(projectId)

  const lists = useMemo(() => listsQuery.data ?? [], [listsQuery.data])
  const tasks = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data])

  const sortedLists = useMemo(() => lists.sort((a, b) => a.order - b.order), [lists])
  const sortedTasks = useMemo(() => tasks.sort((a, b) => a.order - b.order), [tasks])
  const listsIds = useMemo(() => lists.map((list) => list.id), [lists])

  const [optimisticLists, setOptimisticLists] = useState(sortedLists)
  const [optimisticTasks, setOptimisticTasks] = useState(sortedTasks)

  const [activeList, setActiveList] = useState<List | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const { updateOrders, isPending: isUpdatingListsOrders } = useUpdateOrders()
  const { updateTasksOrders, isPending: isUpdatingTaskOrders } = useUpdateTasksOrders()

  const isPending = isUpdatingTaskOrders || isUpdatingListsOrders

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list)
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null)
    setActiveList(null)

    const { active, over } = event

    if (!over) {
      return
    }

    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"
    const isOverAColumn = over.data.current?.type === "Column"

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) {
      return
    }

    if (isActiveATask && isOverATask) {
      setOptimisticTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId)
        const overTaskIndex = tasks.findIndex((task) => task.id === overId)

        if (activeTaskIndex !== overTaskIndex) {
          tasks[activeTaskIndex].listId = tasks[overTaskIndex].listId
          const reorderedTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex)
            .map((item, index) => ({ ...item, order: index + 1 }))
            .sort((a, b) => a.order - b.order)

          const reorderedTasksFiltered = reorderedTasks.map((item) => ({
            id: item.id,
            order: item.order,
            listId: item.listId
          }))
          onUpdateTasksOrders(reorderedTasksFiltered)
          return reorderedTasks
        }

        return tasks
      })
    }
    else if (isActiveATask && isOverAColumn) {
      setOptimisticTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId)

        if (activeTaskIndex !== -1) {
          tasks[activeTaskIndex].listId = overId as string
          const reorderedTasks = tasks
            .map((item, index) => ({ ...item, order: index + 1 }))
            .sort((a, b) => a.order - b.order)

          const reorderedTasksFiltered = reorderedTasks.map((item) => ({
            id: item.id,
            order: item.order,
            listId: item.listId
          }))
          onUpdateTasksOrders(reorderedTasksFiltered)
          return reorderedTasks
        }

        return tasks
      })
    }
    else {
      const activeListIndex = sortedLists.findIndex((list) => list.id === activeId)
      const overListIndex = sortedLists.findIndex((list) => list.id === overId)

      if (activeListIndex === -1 || overListIndex === -1) {
        return
      }

      const reorderedLists = arrayMove(sortedLists, activeListIndex, overListIndex)
        .map((item, index) => ({ ...item, order: index + 1 }))
        .sort((a, b) => a.order - b.order)

      setOptimisticLists(reorderedLists)

      const reorderedListsFiltered = reorderedLists.map((list) => ({
        id: list.id,
        order: list.order
      }))

      onUpdateListsOrders(reorderedListsFiltered)
    }
  }

  function onUpdateListsOrders(
    lists: {
      id: string;
      order: number;
    }[]) {
    updateOrders({ lists }, {
      onError: () => setOptimisticLists(sortedLists)
    })
  }

  function onUpdateTasksOrders(
    tasks: {
      id: string;
      order: number;
      listId: string;
    }[]) {
    if (isPending) return
    updateTasksOrders({ tasks }, {
      onError: () => setOptimisticTasks(sortedTasks)
    })
  }

  useEffect(() => {
    setOptimisticLists(sortedLists)
    setOptimisticTasks(sortedTasks)
  }, [sortedLists, sortedTasks])


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
      <ScrollArea className="min-h-[400px] w-full">
        <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <div className="flex items-start gap-x-2">
            <SortableContext disabled={isPending} items={listsIds}>
              {optimisticLists.map((list) => (
                <ListCard
                  key={list.id}
                  lists={optimisticLists}
                  tasks={optimisticTasks.filter((task) => task.listId === list.id)}
                  list={list}
                  setOptimisticLists={setOptimisticLists}
                  setOptimisticTasks={setOptimisticTasks}
                />
              ))}
            </SortableContext>
            <AddListButton projectId={projectId} />
            <div className="flex-shrink-0 w-1" />
          </div>
          {createPortal(
            <DragOverlay>
              {activeList && (
                <ListCard
                  lists={optimisticLists}
                  tasks={optimisticTasks.filter((task) => task.listId === activeList.id)}
                  list={activeList}
                  setOptimisticLists={setOptimisticLists}
                  setOptimisticTasks={setOptimisticTasks}
                />
              )}
              {activeTask && (
                <TaskCard task={activeTask} tasks={tasks} setOptimisticTasks={setOptimisticTasks} />
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
