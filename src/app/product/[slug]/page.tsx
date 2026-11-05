import React from "react";
import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import {
  Home,
  ChevronRight,
  MapPin,
  Clock,
  Calendar,
  TrendingDown,
  TrendingUp,
  Calculator,
  CheckCircle2,
  Info,
} from "lucide-react";
import { IProduct } from "@/types/type";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  let product: IProduct | null = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      { cache: "no-store" },
    );
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <span className="text-6xl block">🗺️</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          রুট বা ভাড়ার তথ্য খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          আপনি যে রুটের তথ্য খুঁজছেন সেটি সঠিক নয় অথবা সিস্টেম থেকে সরিয়ে
          নেওয়া হয়েছে।
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  // অপারেটরদের কম থেকে বেশি ভাড়া অনুযায়ী সাজানো
  const operators = [...product.operators].sort((a, b) => a.fare - b.fare);
  const minOp = operators[0];
  const maxOp = operators[operators.length - 1];
  const avgFare = Math.round(
    operators.reduce((sum, op) => sum + op.fare, 0) / operators.length,
  );

  return (
    <main className="min-h-screen w-full py-6 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* ১. ব্রেডক্রাম্ব */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <Home size={14} />
            <span>হোম</span>
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/category/${product.category}`}
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <span>{product.categoryIcon}</span>
            <span>{product.categoryNameBn}</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-bold text-slate-900">{product.nameBn}</span>
        </div>

        {/* ২. মেইন রুট হেডার কার্ড */}
        <Card className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-6">
          <Card.Content className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f5f9] border border-slate-200/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                {product.image}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Chip
                    size="sm"
                    className="px-2.5 py-0.5 h-auto rounded-full bg-blue-50 text-blue-600 font-bold text-xs"
                  >
                    {product.categoryNameBn}
                  </Chip>
                  <Chip
                    size="sm"
                    className="px-2.5 py-0.5 h-auto rounded-full bg-slate-100 text-slate-600 font-semibold text-xs"
                  >
                    {product.serviceType}
                  </Chip>
                </div>
                <Card.Title className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {product.nameBn}
                </Card.Title>
                <Card.Description className="text-xs sm:text-sm text-slate-500 font-medium">
                  {product.from} থেকে {product.to} পর্যন্ত {product.serviceType}{" "}
                  সার্ভিসের সম্ভাব্য ভাড়ার তুলনা।
                </Card.Description>
              </div>
            </div>

            {/* আজকের ভাড়া বক্স */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl px-5 py-3.5 flex flex-col md:items-end">
              <span className="text-[11px] font-medium text-slate-400">
                আজকের নির্ধারিত ভাড়া
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {product.today.toLocaleString("bn-BD")} টাকা
                </span>
                <span className="text-xs font-medium text-slate-400">
                  / {product.unitNameBn}
                </span>
              </div>

              <Chip
                size="sm"
                className={`mt-2 px-2.5 py-0.5 h-auto rounded-full text-xs font-bold ${
                  product.change.dir === "up"
                    ? "bg-rose-50 text-rose-600"
                    : product.change.dir === "down"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </Chip>
            </div>
          </Card.Content>

          {/* ৪টি তথ্য */}
          <Card.Footer className="p-0 pt-5 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">যাত্রাপথ</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {product.from} → {product.to}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-xs">
                KM
              </div>
              <div>
                <p className="text-[11px] text-slate-400">দূরত্ব</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {product.distanceKm.toLocaleString("bn-BD")} কিমি
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">সম্ভাব্য সময়</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {product.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">সর্বশেষ আপডেট</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {new Date(product.lastUpdated).toLocaleDateString("bn-BD")}
                </p>
              </div>
            </div>
          </Card.Footer>
        </Card>

        {/* ৩. সর্বনিম্ন, সর্বোচ্চ ও গড় ভাড়ার ৩টি কার্ড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-[#f0fdf4] border border-emerald-200/80 rounded-3xl p-5 space-y-2 shadow-none">
            <Card.Header className="p-0 flex items-center justify-between">
              <Card.Title className="text-xs sm:text-sm font-bold text-emerald-900">
                সর্বনিম্ন ভাড়া
              </Card.Title>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingDown size={16} />
              </div>
            </Card.Header>
            <Card.Content className="p-0 text-2xl sm:text-3xl font-black text-emerald-800">
              {minOp.fare.toLocaleString("bn-BD")} টাকা
            </Card.Content>
            <Card.Footer className="p-0 text-xs font-semibold text-emerald-700">
              অপারেটর: {minOp.operatorName}
            </Card.Footer>
          </Card>

          <Card className="bg-[#fff1f2] border border-rose-200/80 rounded-3xl p-5 space-y-2 shadow-none">
            <Card.Header className="p-0 flex items-center justify-between">
              <Card.Title className="text-xs sm:text-sm font-bold text-rose-900">
                সর্বোচ্চ ভাড়া
              </Card.Title>
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
            </Card.Header>
            <Card.Content className="p-0 text-2xl sm:text-3xl font-black text-rose-900">
              {maxOp.fare.toLocaleString("bn-BD")} টাকা
            </Card.Content>
            <Card.Footer className="p-0 text-xs font-semibold text-rose-700">
              অপারেটর: {maxOp.operatorName}
            </Card.Footer>
          </Card>

          <Card className="bg-[#eff6ff] border border-blue-200/80 rounded-3xl p-5 space-y-2 shadow-none">
            <Card.Header className="p-0 flex items-center justify-between">
              <Card.Title className="text-xs sm:text-sm font-bold text-blue-900">
                গড় ভাড়া
              </Card.Title>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Calculator size={16} />
              </div>
            </Card.Header>
            <Card.Content className="p-0 text-2xl sm:text-3xl font-black text-blue-900">
              {avgFare.toLocaleString("bn-BD")} টাকা
            </Card.Content>
            <Card.Footer className="p-0 text-xs font-semibold text-blue-600">
              সকল অপারেটরের গড় হিসাব
            </Card.Footer>
          </Card>
        </div>

        {/* ৪. অপারেটরভিত্তিক ভাড়ার তুলনা টেবিল কার্ড */}
        <Card className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-5">
          <Card.Header className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <Card.Title className="text-lg sm:text-xl font-extrabold text-slate-900">
                অপারেটরভিত্তিক ভাড়ার তুলনা
              </Card.Title>
              <Card.Description className="text-xs text-slate-500 font-medium">
                একই রুটে বিভিন্ন অপারেটরের ভাড়ার তালিকা (কম থেকে বেশি সাজানো)
              </Card.Description>
            </div>
            <Chip
              size="sm"
              className="px-3 py-1.5 h-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} />
              <span>সবচেয়ে সাশ্রয়ী ভাড়া চিহ্নিত করা আছে</span>
            </Chip>
          </Card.Header>

          <Card.Content className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-y border-slate-100 text-xs font-bold text-slate-400">
                  <th className="py-3 px-4">অপারেটর</th>
                  <th className="py-3 px-4">সার্ভিস টাইপ</th>
                  <th className="py-3 px-4">যাত্রার সময় / বিবরণ</th>
                  <th className="py-3 px-4 text-right">ভাড়া (টাকা)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {operators.map((op, idx) => (
                  <tr
                    key={op.id}
                    className={idx === 0 ? "bg-emerald-50/40" : ""}
                  >
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{op.operatorName}</span>
                        {idx === 0 && (
                          <Chip
                            size="sm"
                            className="px-2 py-0.5 h-auto rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-extrabold"
                          >
                            সর্বনিম্ন
                          </Chip>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Chip
                        size="sm"
                        className="px-2.5 py-1 h-auto rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs"
                      >
                        {op.serviceType}
                      </Chip>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-slate-400" />
                        <span>{op.departureTime}</span>
                      </div>
                    </td>
                    <td
                      className={`py-4 px-4 text-right font-extrabold text-sm sm:text-base ${
                        idx === 0 ? "text-emerald-700" : "text-slate-900"
                      }`}
                    >
                      {op.fare.toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Content>

          <Card.Footer className="p-0 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              * প্রতিটি ভাড়া আনুমানিক এবং অপারেটরভেদে সময়সূচি পরিবর্তনশীল হতে
              পারে।
            </span>
            <span>মুদ্রা: BDT (বাংলাদেশি টাকা)</span>
          </Card.Footer>
        </Card>

        {/* ৫. গুরুত্বপূর্ণ তথ্য ও ভাড়ার নীতিমালা কার্ড */}
        <Card className="bg-[#fffbeb] border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-none">
          <Card.Content className="p-0 flex items-start gap-3">
            <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <Card.Title className="font-extrabold text-amber-950 text-xs sm:text-sm">
                গুরুত্বপূর্ণ তথ্য ও ভাড়ার নীতিমালা:
              </Card.Title>
              <Card.Description className="text-amber-900 font-medium">
                {product.fareNoteBn}
              </Card.Description>
              <p className="text-[11px] text-amber-700">
                * এটি কোনো লাইভ টিকিট বুকিং সার্ভিস নয়। ভ্রমণের পূর্বে
                সংশ্লিষ্ট অপারেটরের কাউন্টারে ভাড়া ও আসন নিশ্চিত করার পরামর্শ
                দেওয়া হচ্ছে।
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
