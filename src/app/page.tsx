"use client";

import { useState, useTransition } from "react";
import { analyzeUrl } from "./actions";
import type { DetectionResult } from "@/lib/detect";
import type { TechCategory } from "@/lib/tech-signatures";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORY_ORDER: TechCategory[] = [
  "Frontend",
  "CSS",
  "Backend",
  "CMS",
  "Hosting",
  "Analytics",
  "Payments",
  "Other",
];

const CATEGORY_ICONS: Record<TechCategory, string> = {
  Frontend: "🖥️",
  CSS: "🎨",
  Backend: "⚙️",
  CMS: "📝",
  Hosting: "☁️",
  Analytics: "📊",
  Payments: "💳",
  Other: "🔧",
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    startTransition(async () => {
      const data = await analyzeUrl(url);
      setResult(data);
    });
  }

  const grouped = result
    ? CATEGORY_ORDER.reduce(
        (acc, cat) => {
          const techs = result.technologies.filter((t) => t.category === cat);
          if (techs.length > 0) acc[cat] = techs;
          return acc;
        },
        {} as Record<TechCategory, typeof result.technologies>
      )
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="flex flex-col items-center px-4 pt-20 pb-12">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-3xl">🔍</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Stack <span className="text-primary">Explorer</span>
          </h1>
        </div>
        <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground">
          What tech stack does that website use? Paste any URL to instantly
          detect the framework, hosting, analytics, payments, and more.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-xl gap-2"
        >
          <Input
            type="text"
            placeholder="e.g. stripe.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 border-primary/30 bg-secondary text-base focus-visible:ring-primary"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Spinner /> Scanning...
              </span>
            ) : (
              "Analyze"
            )}
          </Button>
        </form>

        <p className="mt-3 text-xs text-muted-foreground">
          Free to use &middot; 10 lookups per hour &middot; No signup required
        </p>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-4xl px-4 pb-20">
        {result?.error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
            {result.error}
          </div>
        )}

        {result && !result.error && result.technologies.length === 0 && (
          <div className="rounded-lg border border-border bg-secondary p-8 text-center text-muted-foreground">
            <p className="text-lg font-medium">No technologies detected</p>
            <p className="mt-1 text-sm">
              The site may be blocking automated requests, or it uses
              technologies we don&apos;t recognize yet.
            </p>
          </div>
        )}

        {grouped && Object.keys(grouped).length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Results for{" "}
                <span className="text-primary">{result!.url}</span>
              </h2>
              <Badge variant="outline" className="border-primary/30 text-primary">
                {result!.technologies.length} detected
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_ORDER.map((cat) => {
                const techs = grouped[cat];
                if (!techs) return null;
                return (
                  <Card
                    key={cat}
                    className="border-border/50 bg-card transition-colors hover:border-primary/30"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <span>{CATEGORY_ICONS[cat]}</span>
                        {cat}
                        <Badge
                          variant="secondary"
                          className="ml-auto text-xs"
                        >
                          {techs.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <div
                          key={tech.name}
                          className="flex items-center gap-1.5 rounded-md border border-border/50 bg-secondary px-3 py-1.5 text-sm"
                        >
                          <span>{tech.icon}</span>
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Scanned at{" "}
              {new Date(result!.scannedAt).toLocaleString()}
            </p>
          </>
        )}

        {/* How it works */}
        {!result && (
          <div className="mt-12">
            <h2 className="mb-6 text-center text-xl font-semibold">
              How it works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Paste a URL",
                  desc: "Enter any website address — no signup needed.",
                },
                {
                  step: "2",
                  title: "We scan it",
                  desc: "Our engine analyzes HTML, headers, scripts, and meta tags.",
                },
                {
                  step: "3",
                  title: "See the stack",
                  desc: "Get a categorized breakdown of every technology detected.",
                },
              ].map((item) => (
                <Card
                  key={item.step}
                  className="border-border/50 bg-card text-center"
                >
                  <CardContent className="pt-6">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <a
          href="https://competitor-monitor-flame.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 text-center transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
        >
          <p className="mb-2 text-lg font-semibold text-foreground">
            Want ongoing competitor monitoring?
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            CompetitorIQ tracks your competitors&apos; tech stacks, pricing, features, and more &mdash; automatically, every day.
          </p>
          <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
            Try CompetitorIQ &rarr;
          </span>
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        Stack Explorer &mdash; Free tech stack checker. Detects 50+
        technologies including frameworks, hosting, analytics, and payments.
        <p className="mt-2">
          <a
            href="https://competitor-monitor-flame.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            CompetitorIQ
          </a>
          {" "}&mdash; AI-powered competitor monitoring
        </p>
      </footer>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
