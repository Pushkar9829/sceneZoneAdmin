"use client"

import { CustomModal } from "@/components/ui/custom-modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Phone, Mail } from "lucide-react"
import { BookingDetail, EventProfile } from "./schema"
import { useEffect, useState } from "react"
import { getEventBookingsAction } from "./actions"

interface EventDetailsModalProps {
  event: EventProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDetailsModal({ event, open, onOpenChange }: EventDetailsModalProps) {
  const [bookings, setBookings] = useState<BookingDetail[]>([])
  const [loading, setLoading] = useState(false)

  // FIX: Define the async function inside useEffect to handle dependencies correctly
  useEffect(() => {
    const fetchData = async () => {
      if (!event?._id) return

      setLoading(true)
      const res = await getEventBookingsAction(event._id)
      
      if (res.success && res.data) {
        setBookings(res.data)
      } else {
        setBookings([])
      }
      setLoading(false)
    }

    if (open && event) {
      fetchData()
    }
  }, [open, event]) // 'event' is a dependency here. If event object changes, it refetches.

  if (!event) return null

  return (
    <CustomModal
      title={`Details: ${event.eventName}`}
      // Ensure 'isOpen' and 'onClose' match your CustomModalProps interface.
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className="space-y-6">
        {/* Added Description Text Here instead of via Prop */}
        <p className="text-sm text-muted-foreground -mt-4 mb-4">
            Host: <span className="font-medium text-foreground">{event.hostId?.fullName || "Unknown"}</span> 
            {event.hostId?.mobileNumber && ` (${event.hostId?.mobileNumber})`}
        </p>

        {/* --- Stats Row --- */}
        <div className="flex items-center gap-4 text-sm bg-muted/40 p-3 rounded-lg border">
          <div className="flex-1">
            <span className="text-muted-foreground block text-xs uppercase font-bold">Venue</span>
            <span className="font-medium">{event.venue}</span>
          </div>
          <div className="flex-1">
            <span className="text-muted-foreground block text-xs uppercase font-bold">Budget</span>
            <span className="font-medium">₹{event.budget}</span>
          </div>
          <div className="flex-1">
            <span className="text-muted-foreground block text-xs uppercase font-bold">Status</span>
            <Badge variant={event.isCancelled ? "destructive" : "outline"}>
              {event.isCancelled ? "Cancelled" : event.status}
            </Badge>
          </div>
        </div>

        {/* --- Artists Table --- */}
        <div>
            <h4 className="font-semibold mb-3">Booked Artists</h4>
            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md">
                    No artists booked for this event.
                </div>
            ) : (
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0">
                            <TableRow>
                                <TableHead>Artist</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Financials</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((b) => (
                                <TableRow key={b._id}>
                                    {/* Artist Name & Avatar */}
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            {/* FIX: Removed objectFit prop, used className instead */}
                                            <AvatarImage 
                                                src={b.artist.profileImageUrl || ""} 
                                                className="object-cover" 
                                            />
                                            <AvatarFallback>{b.artist.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{b.artist.fullName}</div>
                                    </TableCell>
                                    
                                    {/* Contact Info */}
                                    <TableCell>
                                        <div className="flex flex-col text-xs text-muted-foreground gap-1">
                                            <span className="flex items-center gap-1">
                                                <Phone className="h-3 w-3" /> {b.artist.mobileNumber}
                                            </span>
                                            {b.artist.email && (
                                                <span className="flex items-center gap-1">
                                                    <Mail className="h-3 w-3" /> {b.artist.email}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    
                                    {/* Money */}
                                    <TableCell>
                                        <div className="text-sm">
                                            Total: ₹{b.totalAmount || b.subtotal || 0}
                                        </div>
                                    </TableCell>
                                    
                                    {/* Status Badge */}
                                    <TableCell>
                                        <Badge 
                                            variant={b.payment_status === "completed" ? "default" : "secondary"}
                                            className={b.payment_status === "completed" ? "bg-green-600 hover:bg-green-700" : ""}
                                        >
                                            {b.payment_status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
      </div>
    </CustomModal>
  )
}