"use client"

import { useState } from "react"
import { DataTable } from "./data-table" 
import { getColumns } from "./columns" // Ensure columns.tsx uses the new Schema
import { EventProfile } from "./schema"
import { EventDetailsModal } from "./event-details-modal"

interface EventsClientProps {
    data: EventProfile[]
}

export function EventsClient({ data }: EventsClientProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventProfile | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleViewDetails = (event: EventProfile) => {
        setSelectedEvent(event)
        setModalOpen(true)
    }

    const columns = getColumns({ onViewDetails: handleViewDetails })

    return (
        <>
            <DataTable columns={columns} data={data} />
            <EventDetailsModal
                event={selectedEvent} 
                open={modalOpen} 
                onOpenChange={setModalOpen} 
            />
        </>
    )
}