"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLoading } from "@/components/providers/LoadingProvider"

interface LoadingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
}

export function LoadingLink({ href, className, children, onClick, ...props }: LoadingLinkProps) {
    const { startLoading } = useLoading()

    return (
        <Link
            href={href}
            onClick={(e) => {
                startLoading()
                onClick?.(e)
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    )
}
