"use client";

import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">

                {/* Minimal Error Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-100 text-red-500">
                    <AlertTriangle size={26} />
                </div>

                {/* Messaging */}
                <div className="space-y-2">
                    <h1 className="text-xl font-bold text-gray-800 font-heading">
                        Something went wrong
                    </h1>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                        {error?.message || "An unexpected application error occurred. Please try again or head back home."}
                    </p>
                </div>

                {/* Essential Recovery Controls */}
                <div className="flex gap-3 justify-center pt-2">
                    {reset && (
                        <Button
                            onClick={() => reset()}
                            color="primary"
                            className="rounded-xl font-bold text-sm bg-primary text-white flex items-center gap-2"
                        >
                            <RefreshCw size={15} />
                            <span>Retry</span>
                        </Button>
                    )}

                    <Button
                        as={Link}
                        href="/"
                        variant="flat"
                        className="rounded-xl font-medium text-sm border border-gray-100 flex items-center gap-2"
                    >
                        <Home size={15} />
                        <span>Home</span>
                    </Button>
                </div>

            </div>
        </div>
    );
}