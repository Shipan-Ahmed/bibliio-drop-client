"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Hook this block straight into your Better Auth instance:
            const res = await authClient.signIn.email({
              email: formData.email,
              password: formData.password,
              callbackURL: "/" 
            });

            console.log("Credentials match found, performing session redirection:", formData);
            setFormData({ email: "", password: "" });
            toast.success("Sign in successfull!");
            router.push("/");
        } catch (err) {
            setError(err.message || "Invalid email or password combination.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        // Hook into Better Auth Google Provider configuration:
        await authClient.signIn.social({ provider: "google" });
        console.log("Redirecting session context via Better Auth Google OAuth...");
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 font-body">
            {/* Decorative structural pattern matches register screen */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0f4c43_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12"
            >
                {/* Left Side Branding Visual Column */}
                <div className="hidden md:flex md:col-span-5 bg-primary p-8 flex-col justify-between text-white relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:12px_12px]"></div>

                    <div className="relative z-10">
                        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-base-100">
                            Biblio<span className="text-secondary italic">Drop</span>
                        </Link>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <h3 className="font-heading text-2xl font-bold text-base-100 leading-tight">
                            Welcome Back Reader.
                        </h3>
                        <p className="text-white/80 text-xs leading-relaxed">
                            Log back in to track your pending delivery states, evaluate recent distributions, or publish pending bookstore listings[cite: 183, 184].
                        </p>
                    </div>

                    <div className="text-white/40 text-xs relative z-10">
                        © {new Date().getFullYear()} BiblioDrop System.
                    </div>
                </div>

                {/* Right Side Main Authentication Interactive Block */}
                <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="font-heading text-2xl font-bold text-primary tracking-tight">
                            Account Login
                        </h2>
                        <p className="text-sm text-neutral/60 mt-1">
                            Provide credentials to sync your reading profiles safely.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 mb-4 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral/40">
                                    <FiMail size={16} />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-gray-50/50"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70">
                                    Password
                                </label>
                                {/* <a href="#" className="text-xs text-primary/80 hover:underline">
                                    Forgot?
                                </a> */}
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral/40">
                                    <FiLock size={16} />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-gray-50/50"
                                />
                            </div>
                        </div>

                        {/* Access Submit CTA */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary hover:bg-[#c59262] text-neutral font-semibold py-3 rounded-xl shadow-md hover:shadow-secondary/10 transition-all text-sm mt-2 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <FiArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-neutral/40 font-medium">Or log in with</span>
                        </div>
                    </div>

                    {/* Google Access Action */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2.5 border border-gray-200 hover:bg-gray-50 text-neutral font-semibold py-2.5 rounded-xl transition-all text-sm"
                    >
                        <FcGoogle size={18} />
                        <span>Sign in with Google</span>
                    </button>

                    {/* Registration Redirect Link */}
                    <p className="text-center text-xs text-neutral/60 mt-6">
                        New to BiblioDrop?{" "}
                        <Link href="/auth/signup" className="text-primary font-bold hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}