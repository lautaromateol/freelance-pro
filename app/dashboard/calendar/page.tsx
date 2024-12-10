"use client"
import { isBefore } from "date-fns"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { EventContentArg } from "@fullcalendar/core/index.js"
import { useGetProjects } from '@/features/projects/api/use-get-projects'
import { useOpenProjectDetail } from "@/features/projects/hooks/use-open-project-detail"
import { cn } from "@/lib/utils"
import { useCallback } from "react"

export default function CalendarPage() {

  const projectsQuery = useGetProjects()

  const { onOpen } = useOpenProjectDetail()

  const projects = projectsQuery.data || []

  const events = projects.filter((project) => project.releaseDate !== null).map((project) => ({ id: project.id, title: project.name, date: new Date(project.releaseDate!) }))

  const renderEventContent = useCallback((eventInfo: EventContentArg) => {
    const title = eventInfo.event.title
    const date = eventInfo.event.startStr
    const id = eventInfo.event.id

    return (
      <div
        role="button"
        onClick={() => onOpen(id)}
        className={cn(
          "rounded-md shadow-sm border border-l-4 px-2 py-1 w-full",
          isBefore(date, new Date()) ? "border-l-rose-500" : "border-l-emerald-500"
        )}
      >
        <p className="text-base">
          {title}
        </p>
        <p className="text-xs font-medium">
          Release date
        </p>
      </div>
    )
  }, [onOpen])

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  )
}

