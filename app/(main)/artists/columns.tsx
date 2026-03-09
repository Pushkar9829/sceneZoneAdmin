'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArtistProfile } from './schema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Pencil, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArtistDetails } from './artist-details'
import { ArtistEditModal } from './artist-edit-modal'
import Image from 'next/image'

// Wrapper component to handle the modal state per row
const ActionCell = ({ artist }: { artist: ArtistProfile }) => {
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const router = useRouter()

  const handleSaved = () => {
    router.refresh()
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setViewOpen(true)}>
          <Eye className="mr-2 h-4 w-4" /> View
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)}>
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
      </div>
      <ArtistDetails
        artist={artist}
        open={viewOpen}
        onOpenChange={setViewOpen}
        onEdit={() => {
          setViewOpen(false)
          setEditOpen(true)
        }}
      />
      <ArtistEditModal
        artist={artist}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSaved={handleSaved}
      />
    </>
  )
}

export const columns: ColumnDef<ArtistProfile>[] = [
  {
    accessorKey: 'artistId.fullName',
    id: 'fullName',
    header: 'Artist Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="h-8 w-8 rounded-full overflow-hidden relative border bg-muted">
          <Image
            src={row.original.profileImageUrl}
            alt="avatar"
            width={100}
            height={100}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="font-medium">{row.original.artistId.fullName}</div>
      </div>
    ),
  },
  {
    accessorKey: 'artistType',
    id: 'artistType',
    header: 'Type',
    cell: ({ row }) => (
      <div className="flex flex-col text-sm">
        <span>{row.original.artistType}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.artistSubType}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ row }) => (
      <span className="font-medium">₹{row.original.budget}</span>
    ),
  },
  {
    accessorKey: 'artistId.isVerified',
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const isVerified = row.original.artistId.isVerified
      return (
        <Badge
          variant="outline"
          className={`gap-1 ${
            isVerified
              ? 'border-green-500 text-green-700 bg-green-50'
              : 'border-yellow-500 text-yellow-700 bg-yellow-50'
          }`}
        >
          {isVerified ? (
            <>
              {' '}
              <CheckCircle2 className="h-3 w-3" /> Verified{' '}
            </>
          ) : (
            <>
              {' '}
              <XCircle className="h-3 w-3" /> Pending{' '}
            </>
          )}
        </Badge>
      )
    },
    // Custom filter to handle boolean values vs string inputs
    filterFn: (row, columnId, filterValue) => {
      // If "verified", check if true. If "pending", check if false.
      const rowValue = row.getValue(columnId)
      if (filterValue === 'verified') return rowValue === true
      if (filterValue === 'pending') return rowValue === false
      return true
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell artist={row.original} />,
  },
]
