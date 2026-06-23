"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiCamera, FiBookOpen, FiShield } from "react-icons/fi";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        photoUrl: "",
        role: "user", // Default option: User (Reader)
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Front-end Validation Guard
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            

            // Here you will hook into your Better Auth client instance:
            // await authClient.signUp.email({
            //   email: formData.email,
            //   password: formData.password,
            //   name: formData.fullName,
            //   image: formData.photoUrl,
            //   data: { role: formData.role }
            // });

            console.log("Registration payload submitted successfully:", formData);
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                photoUrl: "",
                role: "user",
            });

        } catch (err) {
            setError(err.message || "An authentication error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        // Hook into Better Auth Google OAuth:
        // await authClient.signIn.social({ provider: "google" });
        console.log("Initiating Google OAuth via Better Auth...");
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 font-body">
            {/* Decorative clean background patterns */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0f4c43_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12"
            >
                {/* Left Side Aesthetic Info Panel */}
                <div className="hidden md:flex md:col-span-5 bg-primary p-8 flex-col justify-between text-white relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:12px_12px]"></div>

                    <div className="relative z-10">
                        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-base-100">
                            Biblio<span className="text-secondary italic">Drop</span>
                        </Link>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <h3 className="font-heading text-2xl font-bold text-base-100 leading-tight">
                            Join our Literary Network.
                        </h3>
                        <p className="text-white/80 text-xs leading-relaxed">
                            Create an account to access shared catalogs, configure fast doorstep deliveries, or manage your personal book provisions cleanly.
                        </p>
                    </div>

                    <div className="text-white/40 text-xs relative z-10">
                        © {new Date().getFullYear()} BiblioDrop System.
                    </div>
                </div>

                {/* Right Side Main Form Control Panel */}
                <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="font-heading text-2xl font-bold text-primary tracking-tight">
                            Create Account
                        </h2>
                        <p className="text-sm text-neutral/60 mt-1">
                            Get started by registering your ecosystem profile.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 mb-4 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full Name Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70 mb-1.5">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral/40">
                                    <FiUser size={16} />
                                </span>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-gray-50/50"
                                />
                            </div>
                        </div>

                        {/* Email Address Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70 mb-1.5">Email Address</label>
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

                        {/* Photo URL Input Block */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70 mb-1.5">Avatar Image URL</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral/40">
                                    <FiCamera size={16} />
                                </span>
                                <input
                                    type="file"
                                    name="photoUrl"
                                    required
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    placeholder="https://imgbb.com/your-avatar.jpg"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-gray-50/50"
                                />
                            </div>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70 mb-1.5">Password</label>
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

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral/40">
                                        <FiLock size={16} />
                                    </span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-gray-50/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Interactive Role Assignment Selection Requirement */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral/70 mb-2">
                                Select Your Account Role
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleRoleSelect("user")}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${formData.role === "user"
                                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                                            : "border-gray-200 text-neutral/60 hover:bg-gray-50"
                                        }`}
                                >
                                    <FiBookOpen size={14} />
                                    <span>User (Reader)</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleRoleSelect("librarian")}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${formData.role === "librarian"
                                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                                            : "border-gray-200 text-neutral/60 hover:bg-gray-50"
                                        }`}
                                >
                                    <FiShield size={14} />
                                    <span>Librarian</span>
                                </button>
                            </div>
                        </div>

                        {/* Submit Action Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary hover:bg-[#c59262] text-neutral font-semibold py-3 rounded-xl shadow-md hover:shadow-secondary/10 transition-all text-sm mt-2 flex items-center justify-center gap-2"
                        >
                            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign Up"}
                        </button>
                    </form>

                    {/* Social Auth Separator Line */}
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-neutral/40 font-medium">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Social Login Integration Trigger */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2.5 border border-gray-200 hover:bg-gray-50 text-neutral font-semibold py-2.5 rounded-xl transition-all text-sm"
                    >
                        <FcGoogle size={18} />
                        <span>Sign up with Google</span>
                    </button>

                    {/* Redirect to Login Link */}
                    <p className="text-center text-xs text-neutral/60 mt-5">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="text-primary font-bold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}