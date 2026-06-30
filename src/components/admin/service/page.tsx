import { Service } from "@/prisma/generated/client/edge"
import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Service[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Service 1",
      description: "Description for Service 1",
      duration: 60,
      price: 500,
      isActive: true,
      color: "red",
      currency: "NOK",
      createdAt: new Date(),
      updatedAt: new Date(),
      providerId: "provider1"
    },
    {
      id: "2",
      name: "Service 2",
      description: "Description for Service 2",
      duration: 30,
      price: 600,
      isActive: false,
      color: "blue",
      currency: "NOK",
      createdAt: new Date(),
      updatedAt: new Date(),
      providerId: "provider1"
    }
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container p-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}