import { TECH_SIGNATURES, type TechCategory } from "./tech-signatures";

export interface DetectedTech {
  name: string;
  category: TechCategory;
  icon: string;
}

export interface DetectionResult {
  url: string;
  technologies: DetectedTech[];
  scannedAt: string;
  error?: string;
}

export async function detectTechStack(url: string): Promise<DetectionResult> {
  const normalizedUrl = normalizeUrl(url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; StackExplorer/1.0; +https://stackexplorer.dev)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);

    const html = await response.text();
    const headers = Object.fromEntries(
      [...response.headers.entries()].map(([k, v]) => [k.toLowerCase(), v])
    );

    const detected = new Map<string, DetectedTech>();

    for (const sig of TECH_SIGNATURES) {
      if (detected.has(sig.name)) continue;

      let matched = false;

      // Check HTML body patterns
      if (sig.patterns.html) {
        for (const re of sig.patterns.html) {
          if (re.test(html)) {
            matched = true;
            break;
          }
        }
      }

      // Check headers
      if (!matched && sig.patterns.headers) {
        for (const h of sig.patterns.headers) {
          const val = headers[h.key];
          if (val && h.pattern.test(val)) {
            matched = true;
            break;
          }
        }
      }

      // Check meta tags
      if (!matched && sig.patterns.meta) {
        for (const m of sig.patterns.meta) {
          const metaRegex = new RegExp(
            `<meta[^>]*name=["']${m.name}["'][^>]*content=["']([^"']*)["']`,
            "i"
          );
          const altRegex = new RegExp(
            `<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${m.name}["']`,
            "i"
          );
          const match = metaRegex.exec(html) || altRegex.exec(html);
          if (match && (!m.content || m.content.test(match[1]))) {
            matched = true;
            break;
          }
        }
      }

      // Check script srcs
      if (!matched && sig.patterns.scripts) {
        for (const re of sig.patterns.scripts) {
          const scriptRegex = /<script[^>]*src=["']([^"']*)["']/gi;
          let sm;
          while ((sm = scriptRegex.exec(html)) !== null) {
            if (re.test(sm[1])) {
              matched = true;
              break;
            }
          }
          // Also check inline script content
          if (!matched && re.test(html)) {
            matched = true;
          }
          if (matched) break;
        }
      }

      // Check link hrefs
      if (!matched && sig.patterns.links) {
        for (const re of sig.patterns.links) {
          const linkRegex = /<link[^>]*href=["']([^"']*)["']/gi;
          let lm;
          while ((lm = linkRegex.exec(html)) !== null) {
            if (re.test(lm[1])) {
              matched = true;
              break;
            }
          }
          if (matched) break;
        }
      }

      if (matched) {
        detected.set(sig.name, {
          name: sig.name,
          category: sig.category,
          icon: sig.icon,
        });
      }
    }

    return {
      url: normalizedUrl,
      technologies: Array.from(detected.values()),
      scannedAt: new Date().toISOString(),
    };
  } catch (error) {
    clearTimeout(timeout);
    const message =
      error instanceof Error
        ? error.name === "AbortError"
          ? "Request timed out (10s). The website may be slow or blocking automated requests."
          : error.message
        : "Unknown error occurred";

    return {
      url: normalizedUrl,
      technologies: [],
      scannedAt: new Date().toISOString(),
      error: message,
    };
  }
}

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  // Validate
  new URL(url);
  return url;
}
