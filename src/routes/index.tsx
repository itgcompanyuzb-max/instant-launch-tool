import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy } from "react";

const OrbitApp = lazy(() => import("../orbit/App"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orbit LMS — Interaktiv ta'lim platformasi" },
      {
        name: "description",
        content:
          "Orbit LMS — O'quvchi, Ustoz va Admin uchun to'liq interaktiv ta'lim boshqaruv platformasi.",
      },
      { property: "og:title", content: "Orbit LMS — Interaktiv ta'lim platformasi" },
      {
        property: "og:description",
        content:
          "Orbit LMS — O'quvchi, Ustoz va Admin uchun to'liq interaktiv ta'lim boshqaruv platformasi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-[#ECECEC]" />}>
      <OrbitApp />
    </ClientOnly>
  );
}
