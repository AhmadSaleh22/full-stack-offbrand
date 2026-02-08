"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface WaitlistStats {
  count: number;
}

const LAUNCH_DATE = new Date("2026-04-01T00:00:00");

/**
 * Calculates the time remaining until the launch date
 */
function calculateTimeRemaining(): CountdownTime {
  const now = new Date();
  const difference = LAUNCH_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

/**
 * Countdown timer display component
 */
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-zinc-900 text-4xl font-bold text-white dark:bg-zinc-800 sm:h-24 sm:w-24 sm:text-5xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
    </div>
  );
}

export default function ComingSoonPage() {
  const [timeRemaining, setTimeRemaining] = useState<CountdownTime>(
    calculateTimeRemaining()
  );
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [waitlistCount, setWaitlistCount] = useState<number>(0);

  const fetchWaitlistCount = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
      const response = await fetch(`${apiUrl}/waitlist/count`);
      if (response.ok) {
        const data: WaitlistStats = await response.json();
        setWaitlistCount(data.count);
      }
    } catch {
      // Silently fail - count will show 0
    }
  }, []);

  useEffect(() => {
    fetchWaitlistCount();
  }, [fetchWaitlistCount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
      const response = await fetch(`${apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
        fetchWaitlistCount();
      } else {
        const data = await response.json();
        setSubmitStatus("error");
        setErrorMessage(data.message || "Failed to join waitlist");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-zinc-50 via-white to-zinc-100 px-6 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <main className="flex w-full max-w-2xl flex-col items-center text-center">
        {/* Logo & Tagline */}
        <div className="mb-12">
          <h1 className="mb-3 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            off<span className="text-zinc-500">Brand</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Premium quality. Unbranded prices.
          </p>
        </div>

        {/* Coming Soon Badge */}
        <div className="mb-8 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-800">
          Coming Soon
        </div>

        {/* Countdown Timer */}
        <div className="mb-12 flex gap-4 sm:gap-6">
          <CountdownUnit value={timeRemaining.days} label="Days" />
          <CountdownUnit value={timeRemaining.hours} label="Hours" />
          <CountdownUnit value={timeRemaining.minutes} label="Minutes" />
          <CountdownUnit value={timeRemaining.seconds} label="Seconds" />
        </div>

        {/* Waitlist Counter */}
        <div className="mb-8">
          <p className="text-zinc-600 dark:text-zinc-400">
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
              {waitlistCount.toLocaleString()}
            </span>{" "}
            {waitlistCount === 1 ? "person has" : "people have"} joined the
            waitlist
          </p>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <p className="mt-3 text-sm text-green-600 dark:text-green-400">
              You&apos;re on the list! We&apos;ll notify you when we launch.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}
        </form>

        {/* Footer Text */}
        <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-500">
          Be the first to access exclusive deals on premium products.
        </p>
      </main>
    </div>
  );
}
