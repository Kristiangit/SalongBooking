"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Service } from "@/prisma/generated/client"

export const serviceColumns: ColumnDef<Service>[] = [
	{
        accessorKey: "name",
		header: "Navn",
		cell: ({ row }) => {
			return (
				<div className="text-center">
					{row.getValue("name")}
				</div>
			);
		},
	},
    {
        accessorKey: "duration",
        header: () => <div className="text-center">Varighet</div>,
        cell: ({ row }) => {
        return <div className="text-center">{row.getValue("duration")}</div>
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center">Pris</div>,
        cell: ({ row }) => {
        return <div className="text-center">{row.getValue("price")}</div>
        },
    },
    {
        accessorKey: "isActive",
        header: () => <div className="text-center">Aktiv</div>,
        cell: ({ row }) => {
        return <div className="text-center">{row.getValue("isActive")}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
        const service = row.original
    
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
  },
]