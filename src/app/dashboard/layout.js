import DashboardSidebar from "@/src/Components/Dashboard/DashboardSidebar";
import { div } from "framer-motion/m";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex  h-screen">
          <div className="w-64 bg-gray-100 p-4">
              <DashboardSidebar />
          </div>
          <div className="flex-1 flex flex-col">
              <div className="bg-gray-200 p-4">
                  navbar
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {children}
              </div>
          </div>
    </div>
  );
}