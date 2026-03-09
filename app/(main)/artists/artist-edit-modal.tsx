"use client"

import { useState, useCallback } from "react"
import { ArtistProfile } from "./schema"
import { updateArtistAction } from "./actions"
import { CustomModal } from "@/components/ui/custom-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, Video } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ArtistEditModalProps {
  artist: ArtistProfile
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved?: () => void
}

const ARTIST_TYPES = ["Musician", "Singer", "Band", "DJ", "Other"]
const MUSICIAN_SUBTYPES = ["Guitarist", "Drummer", "Pianist", "Violinist", "Other"]

export function ArtistEditModal({
  artist,
  open,
  onOpenChange,
  onSaved,
}: ArtistEditModalProps) {
  const artistId = artist.artistId._id
  const [loading, setLoading] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)
  const [fullName, setFullName] = useState(artist.artistId.fullName)
  const [email, setEmail] = useState(artist.email)
  const [address, setAddress] = useState(artist.address ?? "")
  const [artistType, setArtistType] = useState(artist.artistType)
  const [artistSubType, setArtistSubType] = useState(artist.artistSubType ?? "")
  const [instrument, setInstrument] = useState(artist.instrument ?? "")
  const [budget, setBudget] = useState(String(artist.budget))
  const [isCrowdGuarantee, setIsCrowdGuarantee] = useState(artist.isCrowdGuarantee)
  // Video upload
  const [venueName, setVenueName] = useState("")
  const [genre, setGenre] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoError, setVideoError] = useState("")

  const handleSave = async () => {
    setLoading(true)
    const res = await updateArtistAction(artistId, {
      fullName: fullName.trim() || undefined,
      email: email?.trim() || undefined,
      address: address.trim() || undefined,
      artistType: artistType || undefined,
      artistSubType: artistType === "Musician" ? artistSubType || undefined : undefined,
      instrument: instrument.trim() || undefined,
      budget: Number(budget) || undefined,
      isCrowdGuarantee,
    })
    setLoading(false)
    if (res.success) {
      onSaved?.()
      onOpenChange(false)
    }
    if (res.error) alert(res.error)
  }

  const uploadVideo = useCallback(async () => {
    if (!venueName.trim() || !genre.trim()) {
      setVideoError("Venue name and genre are required")
      return
    }
    if (!videoFile) {
      setVideoError("Please select a video file")
      return
    }
    setVideoError("")
    setVideoLoading(true)
    try {
      const formData = new FormData()
      formData.append("venueName", venueName.trim())
      formData.append("genre", genre.trim())
      formData.append("video", videoFile)
      const res = await fetch(`/api/admin/artist/${artistId}/performance`, {
        method: "POST",
        body: formData,
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setVideoError(data?.message || "Upload failed")
        return
      }
      setVenueName("")
      setGenre("")
      setVideoFile(null)
      onSaved?.()
    } catch {
      setVideoError("Upload failed")
    } finally {
      setVideoLoading(false)
    }
  }, [artistId, venueName, genre, videoFile, onSaved])

  return (
    <CustomModal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title="Edit Artist"
    >
      <div className="flex flex-col gap-5 max-h-[75vh] overflow-y-auto pr-2">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-fullName">Name</Label>
            <Input
              id="edit-fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-address">Address</Label>
            <Input
              id="edit-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Artist Type</Label>
              <Select value={artistType} onValueChange={setArtistType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {ARTIST_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {artistType === "Musician" && (
              <div className="grid gap-2">
                <Label>Sub-type</Label>
                <Select value={artistSubType} onValueChange={setArtistSubType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sub-type" />
                  </SelectTrigger>
                  <SelectContent>
                    {MUSICIAN_SUBTYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-instrument">Instrument</Label>
            <Input
              id="edit-instrument"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              placeholder="e.g. Guitar"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-budget">Charges / Budget (₹ per gig)</Label>
            <Input
              id="edit-budget"
              type="number"
              min={0}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="edit-crowd"
              checked={isCrowdGuarantee}
              onChange={(e) => setIsCrowdGuarantee(e.target.checked)}
              className="rounded border-input"
            />
            <Label htmlFor="edit-crowd" className="font-normal cursor-pointer">
              Crowd guarantee
            </Label>
          </div>
        </div>

        {/* Add performance video */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Video className="h-4 w-4" /> Add performance video
          </h4>
          <div className="grid gap-2">
            <div className="flex gap-2">
              <Input
                placeholder="Venue name"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
              />
              <Input
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="file"
                accept="video/*"
                className="max-w-xs"
                onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={uploadVideo}
                disabled={videoLoading}
              >
                {videoLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-1" />
                )}
                Upload
              </Button>
            </div>
            {videoError && (
              <p className="text-sm text-destructive">{videoError}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
