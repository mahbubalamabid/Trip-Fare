"use client";

import React from "react";
import { Button, Card, Chip } from "@heroui/react";
import { Sparkles, ArrowDown, ShieldCheck } from "lucide-react";
import Link from "next/link";

const POPULAR_ROUTES = [
  {
    id: 1,
    slug: "dhaka-to-chattogram-ac-bus",
    icon: "🚌",
    nameBn: "ঢাকা → চট্টগ্রাম",
    serviceType: "AC বাস",
    fare: "১,২০০ টাকা",
    changeDir: "up",
    changePct: "২.৫%",
  },
  {
    id: 19,
    slug: "dhaka-to-coxbazar-economy-flight",
    icon: "✈️",
    nameBn: "ঢাকা → কক্সবাজার",
    serviceType: "ইকোনমি ফ্লাইট",
    fare: "৫,৫০০ টাকা",
    changeDir: "up",
    changePct: "৪.২%",
  },
  {
    id: 8,
    slug: "dhaka-to-sylhet-train",
    icon: "🚆",
    nameBn: "ঢাকা → সিলেট",
    serviceType: "ট্রেন (শোভন/স্নিগ্ধা)",
    fare: "৫৫০ টাকা",
    changeDir: "down",
    changePct: "১.৩%",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-[#f0f6ff] via-[#f8fafc] to-white py-12 sm:py-20 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Text Content & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Top Update Badge */}
          <Chip className="px-3.5 py-1.5 h-auto rounded-full bg-blue-50/90 border border-blue-200/80 text-[#0d6efd] text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-2xs mb-5">
            <Sparkles size={15} className="text-[#0d6efd] shrink-0" />
            <span>বাংলাদেশের ভ্রমণ ভাড়ার আপডেট</span>
          </Chip>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.18] text-slate-900">
            ভ্রমণের আগে জেনে নিন
            <span className="block text-[#1d4ed8] mt-1">আজকের ভাড়ার হিসাব</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            বাস, ট্রেন, লঞ্চ ও বিমানের ভাড়া তুলনা করুন এক জায়গায়। সবচেয়ে কম
            ভাড়ায় পরিকল্পনা করুন আপনার পরবর্তী ভ্রমণ।
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href={"/#all-products"}>
              <Button
                type="button"
                variant="primary"
                className="h-12 px-6 rounded-2xl bg-[#0d6efd] hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-[0_10px_25px_-5px_rgba(13,110,253,0.4)] transition-all cursor-pointer"
              >
                <span>ভাড়ার তালিকা দেখুন</span>
                <ArrowDown size={18} />
              </Button>
            </Link>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
              <ShieldCheck size={17} className="text-emerald-600 shrink-0" />
              <span>৫টি ক্যাটাগরির রুট ভিত্তিক তুলনা</span>
            </div>
          </div>
        </div>

        {/* Right Column: Popular Routes Card */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <Card className="w-full max-w-[400px] p-5 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            {/* Card Header */}
            <Card.Header className="flex items-center justify-between pb-4 pt-0 px-0">
              <Card.Title className="text-sm font-bold text-slate-600">
                জনপ্রিয় রুটসমূহ
              </Card.Title>
              <Chip
                size="sm"
                className="px-2.5 py-0.5 h-6 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs"
              >
                সক্রিয় ৩০টি রুট
              </Chip>
            </Card.Header>

            {/* Card Content: Route Items */}
            <Card.Content className="flex flex-col gap-3 px-0 py-0">
              {POPULAR_ROUTES.map((route) => {
                const isUp = route.changeDir === "up";

                return (
                  <Link
                    key={route.id}
                    href={`/fare/${route.slug}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] hover:bg-slate-100/80 border border-slate-100 transition-colors"
                  >
                    {/* Left: Icon & Route Info */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl leading-none">
                        {route.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">
                          {route.nameBn}
                        </span>
                        <span className="text-xs text-slate-400 font-medium mt-0.5">
                          {route.serviceType}
                        </span>
                      </div>
                    </div>

                    {/* Right: Fare & Percentage Change */}
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-extrabold text-slate-900">
                        {route.fare}
                      </span>
                      <span
                        className={`text-[11px] font-bold mt-0.5 ${
                          isUp ? "text-[#e11d48]" : "text-[#059669]"
                        }`}
                      >
                        {isUp ? "▲" : "▼"} {route.changePct}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </Card.Content>

            {/* Card Footer */}
            <Card.Footer className="pt-5 pb-0 px-0 flex justify-center">
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide text-center">
                বাস • ট্রেন • লঞ্চ • বিমান • রাইড শেয়ারিং
              </p>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </section>
  );
}