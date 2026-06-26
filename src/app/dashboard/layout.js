import DashboardSidebar from "@/src/Components/Dashboard/DashboardSidebar";

export default  function DashboardLayout({ children }) {
  
    return (
        <div className="flex h-screen w-full overflow-hidden bg-base-100 font-body">
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                {/* <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-4">
                       
                        <span className="text-sm font-semibold text-primary font-heading tracking-tight">
                            BiblioDrop Management System
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                       
                    </div>
                </header> */}

                {/* Dynamic Nested Content Body */}
                <main className="flex-1 p-6 overflow-y-auto bg-gray-50/50">
                    {children}
                </main>
            </div>
        </div>
    );
}