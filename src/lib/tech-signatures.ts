export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Hosting"
  | "Analytics"
  | "Payments"
  | "CSS"
  | "CMS"
  | "Other";

export interface TechSignature {
  name: string;
  category: TechCategory;
  icon: string; // emoji fallback
  patterns: {
    html?: RegExp[];
    headers?: { key: string; pattern: RegExp }[];
    meta?: { name: string; content?: RegExp }[];
    scripts?: RegExp[];
    links?: RegExp[];
  };
}

export const TECH_SIGNATURES: TechSignature[] = [
  // ── Frontend Frameworks ──
  {
    name: "React",
    category: "Frontend",
    icon: "⚛️",
    patterns: {
      html: [/__NEXT_DATA__/, /react-root/, /data-reactroot/, /_reactListening/],
      scripts: [/react\.production\.min\.js/, /react-dom/, /\/react@/],
    },
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "▲",
    patterns: {
      html: [/__NEXT_DATA__/, /__next/, /next\/dist/],
      headers: [{ key: "x-powered-by", pattern: /Next\.js/i }],
      scripts: [/_next\/static/, /_next\/image/],
      links: [/_next\/static\/css/],
    },
  },
  {
    name: "Nuxt",
    category: "Frontend",
    icon: "💚",
    patterns: {
      html: [/__NUXT__/, /nuxt/, /_nuxt\//],
      scripts: [/_nuxt\//, /nuxt\.js/],
    },
  },
  {
    name: "Vue.js",
    category: "Frontend",
    icon: "💎",
    patterns: {
      html: [/data-v-[a-f0-9]/, /id="app".*vue/, /data-vue-/],
      scripts: [/vue\.runtime/, /vue\.global/, /vue@/, /vue\.min\.js/],
    },
  },
  {
    name: "Angular",
    category: "Frontend",
    icon: "🅰️",
    patterns: {
      html: [/ng-version/, /<app-root/, /ng-content/, /ng-container/],
      scripts: [/angular\.min\.js/, /zone\.js/, /@angular\//],
    },
  },
  {
    name: "Svelte",
    category: "Frontend",
    icon: "🔥",
    patterns: {
      html: [/svelte-[a-z0-9]/, /__svelte/],
      scripts: [/svelte/, /\.svelte-kit\//],
    },
  },
  {
    name: "SvelteKit",
    category: "Frontend",
    icon: "🔥",
    patterns: {
      html: [/__sveltekit/, /sveltekit/],
      scripts: [/\.svelte-kit\//, /_app\/immutable/],
    },
  },
  {
    name: "Gatsby",
    category: "Frontend",
    icon: "🟣",
    patterns: {
      html: [/___gatsby/, /gatsby-/],
      scripts: [/gatsby-chunk/, /gatsby-script/],
    },
  },
  {
    name: "Remix",
    category: "Frontend",
    icon: "💿",
    patterns: {
      html: [/__remix/, /remix-run/],
      scripts: [/remix\.run/, /__remix_/],
    },
  },
  {
    name: "Astro",
    category: "Frontend",
    icon: "🚀",
    patterns: {
      html: [/astro-/, /data-astro/],
      scripts: [/astro\//, /astro-island/],
      meta: [{ name: "generator", content: /Astro/i }],
    },
  },
  {
    name: "jQuery",
    category: "Frontend",
    icon: "📜",
    patterns: {
      scripts: [/jquery[.-]/, /jquery\.min\.js/, /\/jquery\//],
    },
  },
  {
    name: "Alpine.js",
    category: "Frontend",
    icon: "🏔️",
    patterns: {
      html: [/x-data=/, /x-bind:/, /x-on:/, /@click\./],
      scripts: [/alpinejs/, /alpine\.min\.js/],
    },
  },
  {
    name: "HTMX",
    category: "Frontend",
    icon: "📡",
    patterns: {
      html: [/hx-get=/, /hx-post=/, /hx-trigger=/, /hx-swap=/],
      scripts: [/htmx\.org/, /htmx\.min\.js/],
    },
  },
  {
    name: "Preact",
    category: "Frontend",
    icon: "⚡",
    patterns: {
      scripts: [/preact/, /preact\.min\.js/],
    },
  },
  {
    name: "Ember.js",
    category: "Frontend",
    icon: "🐹",
    patterns: {
      html: [/ember-view/, /data-ember/],
      scripts: [/ember\.js/, /ember\.min\.js/],
      meta: [{ name: "ember-cli", content: /.*/ }],
    },
  },
  // ── CSS Frameworks ──
  {
    name: "Tailwind CSS",
    category: "CSS",
    icon: "🎨",
    patterns: {
      html: [
        /class="[^"]*\b(flex|grid|mt-|mb-|px-|py-|text-|bg-|rounded-|shadow-|w-|h-)[^"]*"/,
      ],
      links: [/tailwind/],
      scripts: [/tailwindcss/, /tailwind\.config/],
    },
  },
  {
    name: "Bootstrap",
    category: "CSS",
    icon: "🅱️",
    patterns: {
      html: [/class="[^"]*\b(container|row|col-|btn btn-|navbar|modal)/],
      scripts: [/bootstrap\.min\.js/, /bootstrap\.bundle/],
      links: [/bootstrap\.min\.css/, /bootstrap/],
    },
  },
  {
    name: "Bulma",
    category: "CSS",
    icon: "🟢",
    patterns: {
      html: [/class="[^"]*\b(column|is-|has-text-|hero|section)/],
      links: [/bulma\.min\.css/, /bulma/],
    },
  },
  {
    name: "Material UI",
    category: "CSS",
    icon: "🎯",
    patterns: {
      html: [/MuiButton/, /Mui[A-Z]/, /class="[^"]*css-[a-z0-9]{5,}/],
      scripts: [/@mui\/material/, /material-ui/],
    },
  },
  {
    name: "Chakra UI",
    category: "CSS",
    icon: "⚡",
    patterns: {
      html: [/chakra-/, /css-[a-z0-9]+/],
      scripts: [/@chakra-ui/],
    },
  },
  {
    name: "Foundation",
    category: "CSS",
    icon: "🏗️",
    patterns: {
      html: [/class="[^"]*\b(small-|medium-|large-|cell|grid-x)/],
      links: [/foundation\.min\.css/],
      scripts: [/foundation\.min\.js/],
    },
  },
  // ── Backend / Server ──
  {
    name: "WordPress",
    category: "CMS",
    icon: "📝",
    patterns: {
      html: [/wp-content/, /wp-includes/, /wp-json/],
      links: [/wp-content\/themes/, /wp-content\/plugins/],
      scripts: [/wp-includes/, /wp-content/],
      meta: [{ name: "generator", content: /WordPress/i }],
    },
  },
  {
    name: "Drupal",
    category: "CMS",
    icon: "💧",
    patterns: {
      html: [/Drupal\.settings/, /drupal\.js/],
      meta: [{ name: "generator", content: /Drupal/i }],
      scripts: [/drupal\.js/, /\/sites\/default\/files/],
    },
  },
  {
    name: "Joomla",
    category: "CMS",
    icon: "📰",
    patterns: {
      meta: [{ name: "generator", content: /Joomla/i }],
      scripts: [/\/media\/jui\/js/],
    },
  },
  {
    name: "Shopify",
    category: "CMS",
    icon: "🛍️",
    patterns: {
      html: [/Shopify\.theme/, /shopify/, /myshopify\.com/],
      scripts: [/cdn\.shopify\.com/, /shopify_analytics/],
      links: [/cdn\.shopify\.com/],
    },
  },
  {
    name: "Squarespace",
    category: "CMS",
    icon: "⬛",
    patterns: {
      html: [/squarespace/, /sqs-/],
      scripts: [/squarespace\.com/, /static\.squarespace/],
    },
  },
  {
    name: "Wix",
    category: "CMS",
    icon: "🌐",
    patterns: {
      html: [/wix\.com/, /_wix/, /wixsite/],
      scripts: [/static\.wixstatic\.com/, /wix-code/],
    },
  },
  {
    name: "Ghost",
    category: "CMS",
    icon: "👻",
    patterns: {
      html: [/ghost-/, /class="gh-/],
      meta: [{ name: "generator", content: /Ghost/i }],
    },
  },
  {
    name: "Webflow",
    category: "CMS",
    icon: "🔷",
    patterns: {
      html: [/webflow/, /w-nav/, /w-slider/],
      scripts: [/webflow\.js/],
      meta: [{ name: "generator", content: /Webflow/i }],
    },
  },
  {
    name: "Django",
    category: "Backend",
    icon: "🐍",
    patterns: {
      html: [/csrfmiddlewaretoken/, /django/],
      headers: [{ key: "x-frame-options", pattern: /DENY|SAMEORIGIN/ }],
    },
  },
  {
    name: "Ruby on Rails",
    category: "Backend",
    icon: "💎",
    patterns: {
      html: [/csrf-token/, /authenticity_token/],
      headers: [{ key: "x-powered-by", pattern: /Phusion Passenger/i }],
      meta: [{ name: "csrf-token", content: /.*/ }],
    },
  },
  {
    name: "Laravel",
    category: "Backend",
    icon: "🔴",
    patterns: {
      html: [/laravel/, /csrf-token/],
      scripts: [/laravel/, /\/vendor\//],
    },
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: "🟨",
    patterns: {
      headers: [{ key: "x-powered-by", pattern: /Express/i }],
    },
  },
  {
    name: "ASP.NET",
    category: "Backend",
    icon: "🔵",
    patterns: {
      html: [/__VIEWSTATE/, /__EVENTVALIDATION/, /aspnet/],
      headers: [{ key: "x-powered-by", pattern: /ASP\.NET/i }, { key: "x-aspnet-version", pattern: /.*/ }],
    },
  },
  {
    name: "PHP",
    category: "Backend",
    icon: "🐘",
    patterns: {
      headers: [{ key: "x-powered-by", pattern: /PHP/i }],
    },
  },
  // ── Hosting ──
  {
    name: "Vercel",
    category: "Hosting",
    icon: "▲",
    patterns: {
      headers: [
        { key: "x-vercel-id", pattern: /.*/ },
        { key: "server", pattern: /Vercel/i },
      ],
    },
  },
  {
    name: "Netlify",
    category: "Hosting",
    icon: "🌐",
    patterns: {
      headers: [
        { key: "server", pattern: /Netlify/i },
        { key: "x-nf-request-id", pattern: /.*/ },
      ],
    },
  },
  {
    name: "AWS CloudFront",
    category: "Hosting",
    icon: "☁️",
    patterns: {
      headers: [
        { key: "x-amz-cf-id", pattern: /.*/ },
        { key: "server", pattern: /CloudFront/i },
        { key: "via", pattern: /cloudfront/i },
      ],
    },
  },
  {
    name: "Cloudflare",
    category: "Hosting",
    icon: "🟠",
    patterns: {
      headers: [
        { key: "server", pattern: /cloudflare/i },
        { key: "cf-ray", pattern: /.*/ },
      ],
    },
  },
  {
    name: "GitHub Pages",
    category: "Hosting",
    icon: "🐙",
    patterns: {
      headers: [{ key: "server", pattern: /GitHub\.com/i }],
    },
  },
  {
    name: "Firebase Hosting",
    category: "Hosting",
    icon: "🔶",
    patterns: {
      headers: [{ key: "server", pattern: /Google Frontend/i }],
      scripts: [/firebaseapp\.com/, /firebase\.js/, /firebase-app/],
    },
  },
  {
    name: "Heroku",
    category: "Hosting",
    icon: "🟣",
    patterns: {
      headers: [{ key: "via", pattern: /vegur/i }],
    },
  },
  {
    name: "Fly.io",
    category: "Hosting",
    icon: "✈️",
    patterns: {
      headers: [
        { key: "server", pattern: /Fly/i },
        { key: "fly-request-id", pattern: /.*/ },
      ],
    },
  },
  {
    name: "Railway",
    category: "Hosting",
    icon: "🚂",
    patterns: {
      headers: [{ key: "server", pattern: /railway/i }],
    },
  },
  {
    name: "Render",
    category: "Hosting",
    icon: "🎨",
    patterns: {
      headers: [{ key: "server", pattern: /Render/i }],
    },
  },
  // ── Analytics ──
  {
    name: "Google Analytics",
    category: "Analytics",
    icon: "📊",
    patterns: {
      scripts: [
        /google-analytics\.com\/analytics\.js/,
        /googletagmanager\.com\/gtag/,
        /gtag\('config'/,
        /ga\.js/,
      ],
      html: [/UA-\d{4,}-\d/, /G-[A-Z0-9]+/],
    },
  },
  {
    name: "Google Tag Manager",
    category: "Analytics",
    icon: "🏷️",
    patterns: {
      scripts: [/googletagmanager\.com\/gtm\.js/],
      html: [/GTM-[A-Z0-9]+/],
    },
  },
  {
    name: "Plausible",
    category: "Analytics",
    icon: "📈",
    patterns: {
      scripts: [/plausible\.io\/js\//, /plausible\.js/],
    },
  },
  {
    name: "Fathom",
    category: "Analytics",
    icon: "📉",
    patterns: {
      scripts: [/usefathom\.com/, /fathom\.js/],
    },
  },
  {
    name: "Hotjar",
    category: "Analytics",
    icon: "🔥",
    patterns: {
      scripts: [/hotjar\.com/, /static\.hotjar\.com/],
    },
  },
  {
    name: "Mixpanel",
    category: "Analytics",
    icon: "📊",
    patterns: {
      scripts: [/mixpanel\.com/, /mixpanel\.js/],
    },
  },
  {
    name: "Segment",
    category: "Analytics",
    icon: "📊",
    patterns: {
      scripts: [/segment\.com\/analytics/, /cdn\.segment\.com/],
    },
  },
  {
    name: "PostHog",
    category: "Analytics",
    icon: "🦔",
    patterns: {
      scripts: [/posthog\.com/, /posthog\.js/],
    },
  },
  {
    name: "Amplitude",
    category: "Analytics",
    icon: "📊",
    patterns: {
      scripts: [/amplitude\.com/, /amplitude\.min\.js/],
    },
  },
  {
    name: "Heap",
    category: "Analytics",
    icon: "📊",
    patterns: {
      scripts: [/heap-\d+\.js/, /heapanalytics\.com/],
    },
  },
  {
    name: "Microsoft Clarity",
    category: "Analytics",
    icon: "🔍",
    patterns: {
      scripts: [/clarity\.ms\/tag/],
    },
  },
  // ── Payments ──
  {
    name: "Stripe",
    category: "Payments",
    icon: "💳",
    patterns: {
      scripts: [/js\.stripe\.com/, /stripe\.js/],
    },
  },
  {
    name: "PayPal",
    category: "Payments",
    icon: "💰",
    patterns: {
      scripts: [/paypal\.com\/sdk/, /paypalobjects\.com/],
    },
  },
  {
    name: "Square",
    category: "Payments",
    icon: "⬜",
    patterns: {
      scripts: [/squareup\.com/, /square\.js/],
    },
  },
  {
    name: "Paddle",
    category: "Payments",
    icon: "🏓",
    patterns: {
      scripts: [/paddle\.com/, /paddle\.js/],
    },
  },
  {
    name: "LemonSqueezy",
    category: "Payments",
    icon: "🍋",
    patterns: {
      scripts: [/lemonsqueezy\.com/, /lmsqueezy/],
    },
  },
  // ── Other ──
  {
    name: "Intercom",
    category: "Other",
    icon: "💬",
    patterns: {
      scripts: [/intercom\.com/, /intercomcdn\.com/],
      html: [/intercom-/],
    },
  },
  {
    name: "Crisp",
    category: "Other",
    icon: "💬",
    patterns: {
      scripts: [/crisp\.chat/, /client\.crisp\.chat/],
    },
  },
  {
    name: "Drift",
    category: "Other",
    icon: "💬",
    patterns: {
      scripts: [/drift\.com/, /js\.driftt\.com/],
    },
  },
  {
    name: "Sentry",
    category: "Other",
    icon: "🐛",
    patterns: {
      scripts: [/sentry\.io/, /browser\.sentry-cdn\.com/, /@sentry\//],
    },
  },
  {
    name: "Datadog",
    category: "Other",
    icon: "🐶",
    patterns: {
      scripts: [/datadoghq\.com/, /datadog-rum/],
    },
  },
  {
    name: "reCAPTCHA",
    category: "Other",
    icon: "🤖",
    patterns: {
      scripts: [/google\.com\/recaptcha/, /recaptcha\/api\.js/],
    },
  },
  {
    name: "hCaptcha",
    category: "Other",
    icon: "🤖",
    patterns: {
      scripts: [/hcaptcha\.com/, /hcaptcha\.js/],
    },
  },
  {
    name: "Turnstile",
    category: "Other",
    icon: "🔄",
    patterns: {
      scripts: [/challenges\.cloudflare\.com\/turnstile/],
    },
  },
  {
    name: "Font Awesome",
    category: "Other",
    icon: "🔤",
    patterns: {
      links: [/font-awesome/, /fontawesome/],
      scripts: [/fontawesome/, /font-awesome/],
      html: [/class="[^"]*fa fa-/, /class="[^"]*fas fa-/],
    },
  },
  {
    name: "Google Fonts",
    category: "Other",
    icon: "🔤",
    patterns: {
      links: [/fonts\.googleapis\.com/, /fonts\.gstatic\.com/],
    },
  },
  {
    name: "Typekit",
    category: "Other",
    icon: "🔤",
    patterns: {
      links: [/use\.typekit\.net/],
      scripts: [/use\.typekit\.net/],
    },
  },
  {
    name: "Supabase",
    category: "Backend",
    icon: "⚡",
    patterns: {
      scripts: [/supabase\.co/, /supabase\.js/, /@supabase/],
    },
  },
  {
    name: "Prismic",
    category: "CMS",
    icon: "🔺",
    patterns: {
      scripts: [/prismic\.io/, /cdn\.prismic/],
    },
  },
  {
    name: "Contentful",
    category: "CMS",
    icon: "📄",
    patterns: {
      scripts: [/contentful\.com/, /ctfassets\.net/],
      links: [/ctfassets\.net/],
    },
  },
  {
    name: "Sanity",
    category: "CMS",
    icon: "🔴",
    patterns: {
      scripts: [/sanity\.io/, /cdn\.sanity\.io/],
    },
  },
  {
    name: "Strapi",
    category: "CMS",
    icon: "🚀",
    patterns: {
      html: [/strapi/],
      headers: [{ key: "x-powered-by", pattern: /Strapi/i }],
    },
  },
];
