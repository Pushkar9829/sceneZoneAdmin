"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EventProfile } from "./schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { format } from "date-fns"

// This interface allows us to pass the click handler from the parent component
interface ColumnProps {
    onViewDetails: (event: EventProfile) => void
}

export const getColumns = ({ onViewDetails }: ColumnProps): ColumnDef<EventProfile>[] => [
  {
    accessorKey: "eventName",
    header: "Event Name",
    cell: ({ row }) => <span className="font-semibold">{row.original.eventName}</span>
  },
  {
    accessorKey: "hostId.name",
    id: "hostName", // Explicit ID for searching
    header: "Host",
    cell: ({ row }) => (
        <div className="flex flex-col">
            <span>{row.original.hostId?.fullName || "N/A"}</span>
            <span className="text-xs text-muted-foreground">{row.original.hostId?.email}</span>
        </div>
    )
  },
  {
    accessorKey: "eventDateTime",
    header: "Date",
    cell: ({ row }) => {
        const dates = row.original.eventDateTime;
        const firstDate = dates && dates.length > 0 ? new Date(dates[0]) : null;
        return firstDate ? <span>{format(firstDate, "MMM dd, yyyy")}</span> : <span>TBD</span>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status;
        const isCancelled = row.original.isCancelled;
        const isCompleted = row.original.isCompleted;

        let badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
        let label = status;

        if (isCancelled) {
            badgeColor = "bg-red-100 text-red-700 border-red-200";
            label = "Cancelled";
        } else if (isCompleted) {
            badgeColor = "bg-green-100 text-green-700 border-green-200";
            label = "Completed";
        } else if (status === "approved") {
            badgeColor = "bg-purple-100 text-purple-700 border-purple-200";
        }

        return <Badge variant="outline" className={`capitalize ${badgeColor}`}>{label}</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => (
        <Button variant="ghost" size="sm" onClick={() => onViewDetails(row.original)}>
            <Eye className="h-4 w-4 mr-2" /> Details
        </Button>
    )
  }
]