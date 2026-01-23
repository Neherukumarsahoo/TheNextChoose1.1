"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, Download, FileSpreadsheet } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CSVImportDialogProps {
    type: "influencers" | "brands"
}

export function CSVImportDialog({ type }: CSVImportDialogProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch(`/api/${type}/import`, {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                toast.success(`Successfully imported ${result.count} ${type}!`)
                setOpen(false)
                setFile(null)
                router.refresh()
            } else {
                const error = await response.json()
                toast.error(error.message || "Failed to import data")
            }
        } catch (error) {
            toast.error("An error occurred during import")
        } finally {
            setIsUploading(false)
        }
    }

    const downloadTemplate = () => {
        const templates = {
            influencers: "name,instagramId,category,followers,reelPrice,storyPrice,postPrice\nJohn Doe,johndoe,Fashion,50000,500,200,300\n",
            brands: "name,type,industry,city,contactPerson,email,phone\nBrand Inc,Startup,Tech,New York,John Smith,john@brand.com,555-1234\n"
        }

        const csv = templates[type]
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${type}-template.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        toast.success("Template downloaded!")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import CSV
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import {type === "influencers" ? "Influencers" : "Brands"} from CSV</DialogTitle>
                    <DialogDescription>
                        Upload a CSV file to bulk import {type}. Download the template to see the required format.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Button variant="outline" onClick={downloadTemplate} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download CSV Template
                    </Button>

                    <div>
                        <Label htmlFor="file">Upload CSV File</Label>
                        <Input
                            id="file"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="mt-2"
                        />
                        {file && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Selected: {file.name}
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={!file || isUploading}>
                        {isUploading ? "Uploading..." : "Upload & Import"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
