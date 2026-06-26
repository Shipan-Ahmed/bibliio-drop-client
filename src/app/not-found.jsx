"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">

                {/* Animated Graphic/Icon Container */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 animate-bounce">
                    <AlertCircle size={32} />
                </div>

                {/* Text Headers */}
                <div className="space-y-2">
                    <h1 className="text-6xl font-extrabold text-neutral font-heading tracking-tight">
                        404
                    </h1>
                    <h2 className="text-xl font-bold text-gray-800 font-heading">
                        Page Not Found
                    </h2>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button
                        as={Link}
                        href="/"
                        color="primary"
                        className="rounded-xl font-bold text-sm bg-primary text-white shadow-sm flex items-center gap-2"
                    >
                        <Home size={16} />
                        <span>Go Home</span>
                    </Button>

                    <Button
                        onClick={() => window.history.back()}
                        variant="flat"
                        className="rounded-xl font-medium text-sm border border-gray-200 flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        <span>Go Back</span>
                    </Button>
                </div>

            </div>
        </div>
    );
}