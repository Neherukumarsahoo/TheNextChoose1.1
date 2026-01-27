"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  LayoutDashboard,
  Users,
  Building,
  Video,
  FileText,
  Search,
  Plus,
  Moon,
  Sun,
  LogOut,
  Command as CommandIcon 
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function GlobalCommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-gray-900 text-white rounded-full shadow-lg hover:scale-105 transition-transform md:hidden"
      >
        <CommandIcon className="w-6 h-6" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/influencers/add"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add Influencer</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/brands/add"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add Brand</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/influencers"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Influencers</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/brands"))}>
              <Building className="mr-2 h-4 w-4" />
              <span>Brands</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/activity-log"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Audit Logs</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />

          <CommandGroup heading="System">
             <CommandItem onSelect={() => runCommand(() => console.log("Toggle Theme"))}>
               <Moon className="mr-2 h-4 w-4" />
               <span>Toggle Dark Mode</span>
             </CommandItem>
             <CommandItem onSelect={() => runCommand(() => console.log("Logout"))}>
               <LogOut className="mr-2 h-4 w-4" />
               <span>Log out</span>
             </CommandItem>
          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  )
}
