"use client"

import { Pagination } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"

interface TablePaginationProps {
    totalItems: number
    totalPages: number
    currentPage: number
    itemsPerPage?: number
}

export function TablePagination({
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage = 10
}: TablePaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const onPageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())
        router.push(`?${params.toString()}`)
    }

    return (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
        />
    )
}
