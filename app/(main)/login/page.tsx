'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [masterPassword, setMasterPassword] = useState("");

  const router = useRouter();

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMasterPassword(e.target.value);
  };

  // Check if the user is already logged in or not
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ masterPassword }),
    });

    if (!response.ok) {
      toast.error("WRONG Master Password", { duration: 4000, richColors: true });
      return;
    }

    toast.success("Vault unlocked successfully!", { duration: 3000, richColors: true });
    router.push("/");
  };

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center px-4 sm:px-6">
      {/* Card */}
      <section className="w-full max-w-md rounded-lg border bg-accent shadow-lg backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 px-6 pt-6">
          <Image src="/hushbox.png" alt="Hushbox Logo" width={60} height={60} />
          <span className="text-2xl sm:text-3xl font-bold">Hushbox</span>
        </div>

        {/* Content */}
        <form className="px-6 mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1 sm:text-left">
            <h3 className="text-lg font-semibold">
              Secure Vault Access
            </h3>
            <p className="text-sm text-neutral-400">
              Enter your master password to decrypt your vault
            </p>
          </div>

          {/* Password Input */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-400"
            >
              Master Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className="h-11 rounded-md border border-accent-foreground/35 bg-transparent px-3 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              value={masterPassword}
              onChange={onPasswordChange}
            />
          </div>

          {/* Error Message */}
          <div className="hidden items-center gap-2 rounded-md border border-red-500/10 bg-red-500/5 px-3 py-2 text-sm text-red-500">
            <Info size={16} />
            <span>Decryption failed. Invalid credentials.</span>
          </div>

          {/* Button */}
          <div className="pb-4">
            <Button className="mt-6 h-12 w-full" type="submit">
              Unlock Vault
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 border-t px-6 py-4 text-xs text-green-500/60">
          <Lock size={14} />
          <span>END-TO-END ENCRYPTION</span>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;