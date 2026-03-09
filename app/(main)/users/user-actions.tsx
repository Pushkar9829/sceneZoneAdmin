"use client"

import { useState } from "react"
import { AppUser } from "./schema"
import { MoreHorizontal, Trash, Loader2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteUserAction, updateUserAction } from "./actions"

export function UserActions({ user }: { user: AppUser }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editName, setEditName] = useState(user.fullName)
  const [editEmail, setEditEmail] = useState(user.email ?? "")

  const canEdit = user.role === "host" || user.role === "artist"

  async function handleDelete() {
    setLoading(true)
    const res = await deleteUserAction(user._id)
    setLoading(false)
    if (res.success) setIsDeleteOpen(false)
    if (res.error) alert(res.error)
  }

  async function handleEdit() {
    setLoading(true)
    const res = await updateUserAction(user._id, user.role as "host" | "artist", {
      fullName: editName.trim() || undefined,
      email: editEmail.trim() || undefined,
    })
    setLoading(false)
    if (res.success) {
      setIsEditOpen(false)
    }
    if (res.error) alert(res.error)
  }

  function openEdit() {
    setEditName(user.fullName)
    setEditEmail(user.email ?? "")
    setIsEditOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {canEdit && (
            <DropdownMenuItem onClick={openEdit}>
              <Pencil className="mr-2 h-4 w-4" /> Edit User
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* --- EDIT DIALOG --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit user details</DialogTitle>
            <DialogDescription>
              Update name and email for {user.fullName}. Role: {user.role}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- DELETE DIALOG --- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete <span className="font-bold text-foreground">{user.fullName}</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}