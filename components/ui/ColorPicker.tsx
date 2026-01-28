"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
    value: string
    onChange: (value: string) => void
    label?: string
}

export function ColorPicker({ value = "#000000", onChange, label }: ColorPickerProps) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && <Label>{label}</Label>}
            <div className="flex gap-2 items-center">
                <div className="relative h-10 w-10 rounded-md overflow-hidden border shadow-sm">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute -top-2 -left-2 h-16 w-16 cursor-pointer p-0 border-0"
                    />
                </div>
                <Input 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)} 
                    className="w-28 font-mono"
                    maxLength={7}
                    placeholder="#000000"
                />
            </div>
        </div>
    )
}
