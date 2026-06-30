import { columns } from "@/components/admin/service/columns"
import { DataTable } from "@/components/admin/service/data-table"

async function getData(): Promise<any[]> {
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}