"use client";
import "@/app/globals.css";
import "@/components/calendar/MiniCalendar.css";
import Card from "@/components/card";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SidebarProvider from "@/providers/SidebarProvider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const NotFound = () => {
    const route = useRouter()
    return (
        <>
            {/* {loggedIn ? */}
            <>

                <SidebarProvider>
                    <section className="flex h-full w-full">
                        <Sidebar />

                        {/* Navbar & Main Content */}
                        <div className="h-full w-full bg-lightPrimary dark:!bg-[#3a3b3c]">

                            <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
                                {/* Routes */}
                                <div className="h-full">
                                    {/* <Navbar /> */}
                                    <div className="pt-5s mx-auto mb-auto h-full p-2 md:pr-2">
                                        <div className="grid h-[calc(100dvh-20px)] grid-cols-1 gap-5">
                                            <Card className="w-full h-full bg-red-500 flex justify-center place-items-center px-2">
                                                <h1 className="text-4xl font-bold text-red-500">404</h1>
                                                <h2 className="text-2xl font-bold text-red-500">Page not found</h2>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    transition={{ duration: 0.3 }}
                                                    className=" mt-4 px-4 py-2 truncate h-10 rounded-md overflow-clip text-white bg-red-500 hover:cursor-pointer flex"
                                                    onClick={() => route.push("/tasks")}
                                                >
                                                    Go back
                                                </motion.button>
                                            </Card>
                                        </div>

                                    </div>
                                </div>
                            </main>

                        </div>
                    </section>
                </SidebarProvider>
            </>
        </>
    );
};

export default NotFound;
