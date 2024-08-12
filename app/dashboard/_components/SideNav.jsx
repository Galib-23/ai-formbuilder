"use client"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect } from "react";

const SideNav = () => {

    const menuList = [
        {
            id:1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/dashboard'
        },
        {
            id:1,
            name: 'Responses',
            icon: MessageSquare,
            path: '/dashboard/responses'
        },
        {
            id:1,
            name: 'Analytics',
            icon: LineChart,
            path: '/dashboard/analytics'
        },
        {
            id:1,
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        },
    ]

    const path = usePathname();

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {
            menuList.map((menu, idx) => (
                <h2 className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${path === menu.path ? 'bg-primary text-white' : ''}`} key={idx}>
                    <menu.icon />
                    {menu.name}
                </h2>
            ))
        }
      </div>
      <div className="fixed bottom-5 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-7">
            <Progress value={66} />
            <h2 className="text-sm mt-2 text-gray-600">
                <strong>
                    2
                </strong> Out of <strong>3</strong> File Created
            </h2>
            <h2 className="text-xs mt-3 text-gray-500 cursor-pointer hover:underline">Upgrade your plan for unlimited forms 👑</h2>
        </div>
      </div>
    </div>
  )
}

export default SideNav
