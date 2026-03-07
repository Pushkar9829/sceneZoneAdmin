import { getEventsAction } from "./actions"
import { EventsClient } from "./events-client"
import { EventProfile } from "./schema"

export default async function EventsPage() {
  let events: EventProfile[] = []
  
  // Use Server Action directly
  const { success, data } = await getEventsAction()
  
  if (success && data) {
    events = data
  }

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Events</h2>
            <p className="text-muted-foreground">
                Manage events and view detailed booking information.
            </p>
        </div>
      </div>
      <EventsClient data={events} />
    </div>
  )
}