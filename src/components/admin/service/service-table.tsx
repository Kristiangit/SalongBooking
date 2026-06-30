import { DataTable } from "@/components/ui/data-table"
import { serviceColumns } from "./columns"
import { Service } from "@/prisma/generated/client"

async function getData(): Promise<Service[]> {
  return [
    {
      id: "1",
      name: "Service 1",
      description: "Description for Service 1",
      duration: 60,
      price: 5000,
      isActive: true,
      color: "red",
      createdAt: new Date(),
      updatedAt: new Date(),
      providerId: "provider1"
    },
    {
      id: "2",
      name: "Service 2",
      description: "Description for Service 2",
      duration: 30,
      price: 6000,
      isActive: false,
      color: "blue",
      createdAt: new Date(),
      updatedAt: new Date(),
      providerId: "provider1"
    }
  ]
}

export default async function ServiceTable() {
    const data = await getData();
    return(
        <DataTable columns={serviceColumns} data={data} />
    )
}