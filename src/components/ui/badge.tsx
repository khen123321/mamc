import { cn } from "@/lib/utils";

const toneClass = {
  blue: "bg-sky-50 text-sky-800 ring-sky-200",
  green: "bg-green-50 text-green-800 ring-green-200",
  amber: "bg-yellow-50 text-yellow-800 ring-yellow-200",
  red: "bg-orange-50 text-orange-800 ring-orange-200",
  purple: "bg-purple-50 text-purple-800 ring-purple-200",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function Badge({ children, tone = "slate", className }: { children: React.ReactNode; tone?: keyof typeof toneClass; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1", toneClass[tone], className)}>{children}</span>;
}
