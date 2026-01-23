"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer } from "lucide-react"
import { useRef } from "react"

interface InvoiceProps {
    invoiceNumber: string
    date: string
    dueDate: string
    brandName: string
    brandAddress?: string
    items: {
        description: string
        quantity: number
        price: number
    }[]
    total: number
}

export function InvoiceTemplate({ data }: { data: InvoiceProps }) {
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-black min-h-screen">
            <style jsx global>{`
                @media print {
                    @page { margin: 0; }
                    body { margin: 1.6cm; }
                    .no-print { display: none; }
                }
            `}</style>

            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
                    <p className="text-gray-500">#{data.invoiceNumber}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold">TheNextChoose</h2>
                    <p className="text-sm text-gray-500">
                        123 Creator Street<br />
                        Digital City, DC 10101<br />
                        billing@thenextchoose.com
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                    <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider mb-2">Bill To</h3>
                    <p className="font-semibold text-lg">{data.brandName}</p>
                    {data.brandAddress && (
                        <p className="text-gray-600 whitespace-pre-line">{data.brandAddress}</p>
                    )}
                </div>
                <div className="text-right">
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Date</h3>
                        <p>{data.date}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Due Date</h3>
                        <p>{data.dueDate}</p>
                    </div>
                </div>
            </div>

            <table className="w-full mb-12">
                <thead>
                    <tr className="border-b-2 border-gray-100">
                        <th className="text-left py-4 font-semibold">Description</th>
                        <th className="text-right py-4 font-semibold">Qty</th>
                        <th className="text-right py-4 font-semibold">Price</th>
                        <th className="text-right py-4 font-semibold">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-50">
                            <td className="py-4">{item.description}</td>
                            <td className="text-right py-4">{item.quantity}</td>
                            <td className="text-right py-4">₹{item.price.toLocaleString()}</td>
                            <td className="text-right py-4">₹{(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mb-12">
                <div className="w-1/3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₹{data.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tax (0%)</span>
                        <span className="font-semibold">₹0.00</span>
                    </div>
                    <div className="flex justify-between py-4">
                        <span className="text-xl font-bold">Total</span>
                        <span className="text-xl font-bold text-blue-600">₹{data.total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="border-t pt-8 text-center text-sm text-gray-500">
                <p className="font-semibold mb-1">Thank you for your business!</p>
                <p>Please make checks payable to TheNextChoose Inc.</p>
            </div>

            <div className="fixed bottom-8 right-8 no-print">
                <Button onClick={handlePrint} size="lg" className="shadow-xl">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Invoice
                </Button>
            </div>
        </div>
    )
}
