"use server";

import { headers } from "next/headers";
import { detectTechStack, type DetectionResult } from "@/lib/detect";
import { checkRateLimit } from "@/lib/rate-limit";

export async function analyzeUrl(url: string): Promise<DetectionResult> {
  // Rate limiting
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return {
      url,
      technologies: [],
      scannedAt: new Date().toISOString(),
      error: "Rate limit exceeded. You can perform 10 lookups per hour. Please try again later.",
    };
  }

  // Basic URL validation
  const trimmed = url.trim();
  if (!trimmed) {
    return {
      url: "",
      technologies: [],
      scannedAt: new Date().toISOString(),
      error: "Please enter a URL.",
    };
  }

  try {
    const normalized = trimmed.match(/^https?:\/\//) ? trimmed : `https://${trimmed}`;
    new URL(normalized);
  } catch {
    return {
      url: trimmed,
      technologies: [],
      scannedAt: new Date().toISOString(),
      error: "Invalid URL. Please enter a valid website address.",
    };
  }

  return detectTechStack(trimmed);
}
