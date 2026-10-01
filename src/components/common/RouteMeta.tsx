import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "Shrestha Services";
const DEFAULT_DESC =
  "A Biratnagar print and signage workshop. Large-format flex, LED acrylic sign boards, vehicle wraps and digital print — proofed, produced and installed in-house.";

/** Static route → { title, description } map. Dynamic detail pages set their
 *  own meta at runtime via usePageMeta(). */
const ROUTE_META: Record<string, { title: string; description?: string }> = {
  "/": {
    title: "Printing & Signage in Biratnagar",
    description: DEFAULT_DESC,
  },
  "/about": {
    title: "About the Workshop",
    description:
      "The people, presses and process behind Shrestha Services — a Biratnagar print and signage workshop.",
  },
  "/services": {
    title: "Printing & Signage Services",
    description:
      "Flex printing, LED and acrylic sign boards, vehicle wraps, offset and digital print — see every service we produce in-house.",
  },
  "/gallery": {
    title: "Work Gallery",
    description: "A selection of flex, signage and print work produced and installed by our workshop.",
  },
  "/projects": {
    title: "Projects",
    description: "Signage and print projects we've delivered for businesses across Nepal.",
  },
  "/testimonials": {
    title: "Client Testimonials",
    description: "What businesses say about working with Shrestha Services.",
  },
  "/contact": {
    title: "Contact Us",
    description: "Visit the workshop, call, or send us your brief — we reply the same working day.",
  },
  "/quote": {
    title: "Request a Quote",
    description: "Tell us about your print or signage job and get a tailored quote from our team.",
  },
  "/faq": {
    title: "Frequently Asked Questions",
    description: "Answers on turnaround, file formats, proofing, delivery and payment.",
  },
  "/blog": {
    title: "Blog & Print Insights",
    description: "Guides and insights on printing, signage and brand production from our workshop.",
  },
  "/careers": {
    title: "Careers",
    description: "Join the Shrestha Services workshop — open roles in print production, design and operations.",
  },
  "/privacy": { title: "Privacy Policy" },
  "/terms": { title: "Terms & Conditions" },
  "/sitemap": { title: "Sitemap" },
  "/login": { title: "Sign In" },
  "/register": { title: "Create an Account" },
  "/forgot-password": { title: "Reset Your Password" },
};

function setDescription(desc: string) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", desc);
}

function applyMeta(title: string, description?: string) {
  document.title = `${title} — ${SITE}`;
  if (description) setDescription(description);
}

/**
 * Set the document title and meta description for dynamic pages (detail pages
 * whose title depends on fetched data). Reverts to the site default on unmount
 * so stale titles don't linger between routes.
 */
export function usePageMeta(title: string | undefined, description?: string) {
  useEffect(() => {
    if (!title) return;
    applyMeta(title, description);
  }, [title, description]);
}

/**
 * Mounted once inside the router. Applies the static route meta on every
 * navigation. Dynamic pages override this with usePageMeta once their data loads.
 */
export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname];
    // Static routes get their mapped meta; dynamic detail routes (e.g.
    // /blog/:slug) are left to usePageMeta once their data loads.
    if (meta) applyMeta(meta.title, meta.description ?? DEFAULT_DESC);
  }, [pathname]);

  return null;
}
