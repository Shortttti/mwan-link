import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Construction,
  Database,
  Download,
  Factory,
  FileText,
  FlaskConical,
  Gauge,
  LayoutDashboard,
  Leaf,
  MapPinned,
  Menu,
  PackageSearch,
  Recycle,
  Route as RouteIcon,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  UploadCloud,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/mvp")({
  head: () => ({
    meta: [
      { title: "موان | مركز عمليات MVP" },
      {
        name: "description",
        content:
          "نموذج MVP احترافي لإدارة مخلفات البناء وإعادة التوظيف والمطابقة الذكية.",
      },
    ],
  }),
  component: MvpPage,
});

type SectionId =
  | "overview"
  | "decision"
  | "network"
  | "transport"
  | "evidence"
  | "reports";

type NetworkNode = {
  id: string;
  name: string;
  kind: "source" | "facility" | "transport";
  material: string;
  quantity: string;
  status: string;
  x: number;
  y: number;
};

const navItems: {
  id: SectionId;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}[] = [
  { id: "overview", label: "مركز العمليات", icon: LayoutDashboard },
  { id: "decision", label: "مركز القرار الذكي", icon: BrainCircuit, badge: "AI" },
  { id: "network", label: "شبكة المواقع", icon: MapPinned },
  { id: "transport", label: "الرحلات والناقلون", icon: Truck },
  { id: "evidence", label: "إثبات الـ MVP", icon: FlaskConical },
  { id: "reports", label: "التقارير والذاكرة", icon: FileText },
];

const kpis = [
  {
    label: "الكميات المسجلة",
    value: "486",
    unit: "طن",
    note: "↑ 18% خلال 30 يوم",
    icon: PackageSearch,
    tone: "emerald",
  },
  {
    label: "مطابقات ذكية",
    value: "61",
    unit: "مطابقة",
    note: "12 مطابقة هذا الأسبوع",
    icon: BrainCircuit,
    tone: "blue",
  },
  {
    label: "رحلات نشطة",
    value: "9",
    unit: "رحلات",
    note: "4 قيد النقل · 5 مجدولة",
    icon: Truck,
    tone: "amber",
  },
  {
    label: "تحويل عن التخلص",
    value: "71",
    unit: "%",
    note: "مؤشر تجريبي للـ MVP",
    icon: Recycle,
    tone: "violet",
  },
];

const wasteMix = [
  { name: "خرسانة", value: 48, color: "#0f8f6f" },
  { name: "حديد", value: 20, color: "#3b82f6" },
  { name: "طوب وبلوك", value: 16, color: "#d9902f" },
  { name: "خشب", value: 7, color: "#7c63dd" },
  { name: "مختلط", value: 9, color: "#96a49f" },
];

const trendData = [
  { week: "أسبوع 1", tons: 71 },
  { week: "أسبوع 2", tons: 96 },
  { week: "أسبوع 3", tons: 133 },
  { week: "أسبوع 4", tons: 165 },
];

const performanceData = [
  { week: "أسبوع 1", registered: 98, redirected: 71 },
  { week: "أسبوع 2", registered: 112, redirected: 82 },
  { week: "أسبوع 3", registered: 127, redirected: 93 },
  { week: "أسبوع 4", registered: 149, redirected: 99 },
];

const nodes: NetworkNode[] = [
  {
    id: "MWN-CW-01",
    name: "مشروع تطوير حي النور",
    kind: "source",
    material: "خرسانة",
    quantity: "42 طن",
    status: "متاح للمطابقة",
    x: 74,
    y: 28,
  },
  {
    id: "MWN-CW-02",
    name: "مشروع مبنى تجاري",
    kind: "source",
    material: "حديد",
    quantity: "18 طن",
    status: "بانتظار التحقق",
    x: 38,
    y: 38,
  },
  {
    id: "MWN-RF-03",
    name: "منشأة تدوير الخرسانة",
    kind: "facility",
    material: "خرسانة",
    quantity: "سعة 120 طن",
    status: "متاح",
    x: 25,
    y: 70,
  },
  {
    id: "MWN-RU-04",
    name: "وجهة إعادة استخدام",
    kind: "facility",
    material: "طوب وبلوك",
    quantity: "سعة 65 طن",
    status: "متاح",
    x: 75,
    y: 72,
  },
  {
    id: "MWN-TR-05",
    name: "ناقل مؤهل 05",
    kind: "transport",
    material: "متعدد",
    quantity: "22 طن/رحلة",
    status: "في مهمة",
    x: 51,
    y: 55,
  },
  {
    id: "MWN-CW-06",
    name: "مشروع إزالة مبنى",
    kind: "source",
    material: "مختلط",
    quantity: "31 طن",
    status: "أولوية عالية",
    x: 58,
    y: 23,
  },
];

const missions = [
  ["TR-108", "خرسانة", "حي النور", "منشأة تدوير الخرسانة", "22 طن", "ناقل 05", "قيد النقل"],
  ["TR-107", "حديد", "مبنى تجاري", "وجهة المعادن", "18 طن", "ناقل 02", "تم التسليم"],
  ["TR-106", "طوب وبلوك", "مشروع سكني", "وجهة إعادة استخدام", "14 طن", "ناقل 11", "مجدولة"],
  ["TR-105", "خرسانة", "مشروع إزالة", "منشأة تدوير الخرسانة", "21 طن", "ناقل 05", "تم التسليم"],
];

const toneClasses: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
};

function MvpPage() {
  const [section, setSection] = useState<SectionId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const title = navItems.find((item) => item.id === section)?.label ?? "";

  return (
    <div className="min-h-screen bg-[#f3f6f5] text-[#132821]" dir="rtl">
      <Sidebar
        active={section}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSelect={(id) => {
          setSection(id);
          setMobileOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <div className="min-h-screen lg:mr-[278px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#dfe8e5] bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#dfe8e5] bg-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="mb-1 text-[10px] font-bold tracking-[0.18em] text-[#8b9b95]">
                MWAN / MVP OPERATIONS
              </p>
              <h1 className="text-base font-extrabold sm:text-lg">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-[#dfe8e5] bg-[#f7faf9] px-3 py-2 text-[10px] text-[#71817b] sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
              <span>حالة النموذج</span>
              <b className="text-[#1e4a3d]">جاهز</b>
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#dfe8e5] bg-white">
              <Bell className="h-4 w-4" />
              <span className="absolute -left-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[8px] font-bold text-white">
                3
              </span>
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0d8f70] text-[10px] font-extrabold text-white">
              MW
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {section === "overview" && (
            <Overview onOpenDecision={() => setSection("decision")} />
          )}
          {section === "decision" && <DecisionCenter />}
          {section === "network" && (
            <Network
              selected={selectedNode}
              onSelect={setSelectedNode}
            />
          )}
          {section === "transport" && <Transport />}
          {section === "evidence" && <Evidence />}
          {section === "reports" && <Reports />}
        </main>

        <footer className="flex flex-col justify-between gap-2 border-t border-[#dfe8e5] bg-white px-6 py-5 text-[9px] text-[#8b9a95] sm:flex-row">
          <span>MWAN Construction Waste Intelligence MVP</span>
          <span>بيانات محاكاة لأغراض العرض والاختبار فقط · 2026</span>
        </footer>
      </div>
    </div>
  );
}

function Sidebar({
  active,
  open,
  onClose,
  onSelect,
}: {
  active: SectionId;
  open: boolean;
  onClose: () => void;
  onSelect: (id: SectionId) => void;
}) {
  return (
    <>
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-label="إغلاق القائمة"
        />
      )}
      <aside
        className={[
          "fixed inset-y-0 right-0 z-50 flex w-[278px] flex-col bg-[linear-gradient(180deg,#061610_0%,#0a2018_100%)] p-4 text-white shadow-2xl transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#22c997,#08735c)] text-xl font-black shadow-[0_12px_35px_rgba(18,178,135,.22)]">
            م
          </div>
          <div>
            <b className="block text-xl">موان</b>
            <span className="text-[9px] tracking-[0.18em] text-[#88a79b]">
              WASTE INTELLIGENCE MVP
            </span>
          </div>
          <button
            className="mr-auto grid h-9 w-9 place-items-center rounded-lg border border-white/10 lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-2 mb-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-[#a2bbb2]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.08)]" />
          بيئة عرض تجريبية · MVP
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={[
                  "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-right text-xs font-bold transition",
                  selected
                    ? "border-emerald-400/10 bg-emerald-400/10 text-white"
                    : "border-transparent text-[#91aaa0] hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-4 w-4 text-[#9ed8c6]" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="mr-auto rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[8px] text-emerald-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              حالة النموذج
            </div>
            {[
              ["محرك المطابقة", "جاهز"],
              ["شبكة المواقع", "متصلة"],
              ["Vision AI", "Demo"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-t border-white/5 py-2 text-[9px] text-[#809c91]"
              >
                <span>{label}</span>
                <b className="text-[#b8e6d7]">{value}</b>
              </div>
            ))}
          </div>
          <p className="px-2 pt-3 text-[8px] leading-5 text-[#607b70]">
            هذا الـMVP مستقل عن الأنظمة التشغيلية الفعلية لموان، والبيانات
            المعروضة محاكاة لأغراض العرض.
          </p>
        </div>
      </aside>
    </>
  );
}

function PageIntro({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
      <div>
        <span className="text-[9px] font-black tracking-[0.18em] text-[#0c8f70]">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-[28px]">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-xs leading-7 text-[#6c7e77]">
          {text}
        </p>
      </div>
      {action}
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={
        "rounded-[20px] border border-[#dfe8e5] bg-white p-4 shadow-[0_16px_45px_rgba(27,53,45,.055)] sm:p-5 " +
        className
      }
    >
      {children}
    </section>
  );
}

function PanelTitle({
  kicker,
  title,
  subtitle,
  right,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <span className="text-[8px] font-black tracking-[0.16em] text-[#0c8f70]">
          {kicker}
        </span>
        <h3 className="mt-1 text-[15px] font-extrabold">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-[9px] leading-5 text-[#879690]">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}

function Overview({ onOpenDecision }: { onOpenDecision: () => void }) {
  return (
    <>
      <PageIntro
        eyebrow="CONSTRUCTION & DEMOLITION WASTE INTELLIGENCE"
        title="صورة تشغيلية موحّدة من المصدر حتى إعادة الاستخدام"
        text="مركز عمليات MVP يربط مولّد المخلفات بالناقل المؤهل والمنشأة الأنسب، ويحوّل البيانات التشغيلية إلى قرارات واضحة قابلة للتنفيذ."
        action={
          <button
            onClick={onOpenDecision}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c8f70] px-4 py-3 text-[11px] font-extrabold text-white shadow-[0_10px_28px_rgba(12,143,112,.2)]"
          >
            <Sparkles className="h-4 w-4" />
            طلب تحليل جديد
          </button>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="relative overflow-hidden rounded-[18px] border border-[#dfe8e5] bg-white p-4 shadow-[0_8px_28px_rgba(29,57,49,.04)]"
            >
              <div className="flex items-center justify-between text-[10px] text-[#72827d]">
                <span>{item.label}</span>
                <span
                  className={
                    "grid h-9 w-9 place-items-center rounded-xl " +
                    toneClasses[item.tone]
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3 text-3xl font-black tracking-tight">
                {item.value}{" "}
                <span className="text-[10px] font-bold text-[#71807b]">
                  {item.unit}
                </span>
              </div>
              <p className="mt-2 text-[9px] text-[#91a09a]">{item.note}</p>
              <div className="absolute -bottom-8 -left-6 h-24 w-24 rounded-full bg-[#f0f6f4]" />
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_.72fr]">
        <Panel>
          <PanelTitle
            kicker="LIVE NETWORK"
            title="الخريطة التشغيلية"
            subtitle="المصادر، المنشآت، الناقلون والمسار المقترح."
            right={<Legend />}
          />
          <NetworkMap compact />
        </Panel>

        <Panel className="border-t-4 border-t-amber-400">
          <PanelTitle
            kicker="HIGH PRIORITY"
            title="حالة تتطلب قرار"
            right={
              <span className="rounded-lg border border-[#e2e8e5] px-2 py-1 text-[8px] text-[#7f8f89]">
                MWN-CW-06
              </span>
            }
          />

          <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-sm font-black text-white">
              !
            </div>
            <div>
              <b className="block text-xs">مشروع إزالة مبنى</b>
              <span className="text-[9px] text-amber-800/70">
                مخلفات مختلطة · 31 طن
              </span>
            </div>
          </div>

          <div className="my-4">
            <div className="mb-2 flex justify-between text-[9px] text-[#71827c]">
              <span>جاهزية القرار</span>
              <b className="text-[#244d41]">82%</b>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#edf2f0]">
              <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#0a8f70,#28c89d)]" />
            </div>
          </div>

          <div className="space-y-2">
            {[
              ["01", "تسجيل المصدر", "تم استلام الموقع والصور", true],
              ["02", "تحليل أولي", "فصل الخرسانة والحديد مقترح", true],
              ["03", "مطابقة الوجهة", "جارٍ تقييم السعة والمسافة", true],
              ["04", "تأكيد الرحلة", "بانتظار اختيار الناقل", false],
            ].map(([num, title, note, active]) => (
              <div key={String(num)} className="flex items-center gap-3 py-1">
                <span
                  className={[
                    "grid h-7 w-7 place-items-center rounded-lg text-[8px] font-black",
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-[#f1f4f3] text-[#94a09c]",
                  ].join(" ")}
                >
                  {num as string}
                </span>
                <div>
                  <b className="block text-[10px]">{title as string}</b>
                  <small className="text-[8px] text-[#93a09b]">
                    {note as string}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenDecision}
            className="mt-4 w-full rounded-xl bg-[#0c8f70] py-3 text-[10px] font-extrabold text-white"
          >
            فتح مركز القرار
          </button>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_.85fr]">
        <Panel>
          <PanelTitle kicker="MATERIAL MIX" title="توزيع المواد" />
          <div className="h-[235px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={2}
                >
                  {wasteMix.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-[8px] text-[#75867f]">
            {wasteMix.map((item) => (
              <span key={item.name} className="flex items-center gap-1">
                <i
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle kicker="DIVERSION TREND" title="الكميات المحوّلة عن التخلص" />
          <div className="h-[270px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid stroke="#edf2f0" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tons"
                  stroke="#0a8f70"
                  strokeWidth={3}
                  dot={{ r: 3, fill: "#0a8f70" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            kicker="ACTIVITY FEED"
            title="آخر الأحداث"
            right={
              <span className="flex items-center gap-1 text-[8px] text-emerald-700">
                <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
              </span>
            }
          />
          <div className="space-y-1">
            {[
              [CheckCircle2, "تم تأكيد استلام 18 طن حديد", "قبل 4 دقائق", "emerald"],
              [BrainCircuit, "إنشاء مطابقة جديدة", "قبل 11 دقيقة", "blue"],
              [Truck, "بدء رحلة نقل TR-108", "قبل 19 دقيقة", "amber"],
              [ScanLine, "اكتمال تحليل صورة", "قبل 27 دقيقة", "violet"],
            ].map(([Icon, title, time, tone], index) => {
              const C = Icon as typeof CheckCircle2;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 border-b border-[#edf2f0] py-3 last:border-0"
                >
                  <span
                    className={
                      "grid h-8 w-8 place-items-center rounded-xl " +
                      toneClasses[tone as string]
                    }
                  >
                    <C className="h-4 w-4" />
                  </span>
                  <div>
                    <b className="block text-[9px]">{title as string}</b>
                    <small className="text-[8px] text-[#96a29d]">
                      {time as string}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}

function Legend() {
  return (
    <div className="hidden gap-3 text-[8px] text-[#81908a] sm:flex">
      <span className="flex items-center gap-1">
        <i className="h-2 w-2 rounded-full bg-amber-500" /> مصدر
      </span>
      <span className="flex items-center gap-1">
        <i className="h-2 w-2 rounded-full bg-emerald-600" /> منشأة
      </span>
      <span className="flex items-center gap-1">
        <i className="h-2 w-2 rounded-full bg-blue-500" /> ناقل
      </span>
    </div>
  );
}

function NetworkMap({
  compact = false,
  selected,
  onSelect,
}: {
  compact?: boolean;
  selected?: NetworkNode;
  onSelect?: (node: NetworkNode) => void;
}) {
  const height = compact ? "h-[390px]" : "h-[520px]";
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border border-[#d8e6e1] bg-[#e9f0ed] " +
        height
      }
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(35,85,70,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(35,85,70,.08) 1px,transparent 1px),radial-gradient(circle at 20% 30%,rgba(15,143,111,.18),transparent 25%),radial-gradient(circle at 75% 70%,rgba(59,130,246,.10),transparent 28%)",
          backgroundSize: "28px 28px,28px 28px,100% 100%,100% 100%",
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M74 28 C64 36,58 44,51 55 S36 64,25 70" fill="none" stroke="#0a8f70" strokeWidth="0.9" strokeDasharray="2 2" />
        <path d="M58 23 C59 35,56 47,51 55" fill="none" stroke="#d9902f" strokeWidth="0.55" strokeDasharray="1.5 2" />
      </svg>

      {nodes.map((node) => {
        const active = selected?.id === node.id;
        const color =
          node.kind === "source"
            ? "bg-amber-500"
            : node.kind === "transport"
              ? "bg-blue-500"
              : "bg-emerald-600";
        return (
          <button
            key={node.id}
            onClick={() => onSelect?.(node)}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-right"
            style={{ left: node.x + "%", top: node.y + "%" }}
          >
            <span
              className={[
                "relative grid h-5 w-5 place-items-center rounded-full border-2 border-white shadow-lg transition",
                color,
                active ? "scale-125 ring-4 ring-white/70" : "hover:scale-110",
              ].join(" ")}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {!compact && (
              <span className="absolute right-7 top-1/2 w-max -translate-y-1/2 rounded-lg border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-bold text-[#38544b] shadow-sm">
                {node.name}
              </span>
            )}
          </button>
        );
      })}

      <div className="absolute bottom-4 right-4 rounded-xl bg-[#09231b]/90 px-3 py-2 text-white shadow-xl backdrop-blur">
        <div className="flex items-center gap-2 text-[8px]">
          <Activity className="h-3 w-3 text-emerald-300" />
          شبكة تشغيل تجريبية
        </div>
        <div className="mt-1 text-lg font-black text-emerald-300">6</div>
        <div className="text-[7px] text-[#a8c4ba]">نقاط فعّالة</div>
      </div>
    </div>
  );
}

function DecisionCenter() {
  const [imageUrl, setImageUrl] = useState<string>();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = () => {
    if (!imageUrl) return;
    setRunning(true);
    setDone(false);
    window.setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 900);
  };

  return (
    <>
      <PageIntro
        eyebrow="AI DECISION CENTER"
        title="من صورة المخلفات إلى توصية تشغيلية قابلة للتنفيذ"
        text="المسار يجمع التحليل المرئي، الكمية، السعة، المسافة، وحالة الناقل ثم يقدّم مطابقة مفسّرة. تحليل الصورة في هذا الـMVP تجربة واجهة قابلة للربط بمحرك Vision فعلي."
        action={
          <span className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-[9px] font-bold text-emerald-700">
            Vision AI · MVP Demo
          </span>
        }
      />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {[
          ["01", "رفع الصورة"],
          ["02", "تصنيف المادة"],
          ["03", "تأكيد الكمية"],
          ["04", "المطابقة"],
          ["05", "القرار"],
        ].map(([num, label], index) => (
          <div
            key={num}
            className="flex min-w-[145px] flex-1 items-center gap-2 rounded-2xl border border-[#dfe8e5] bg-white p-3"
          >
            <span
              className={[
                "grid h-8 w-8 place-items-center rounded-lg text-[8px] font-black",
                index === 0 ? "bg-[#0c8f70] text-white" : "bg-[#edf3f1] text-[#76857f]",
              ].join(" ")}
            >
              {num}
            </span>
            <b className="text-[9px]">{label}</b>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <PanelTitle
            kicker="INPUT"
            title="تحليل عينة مخلفات"
            subtitle="ارفع صورة واضحة ثم حدّد مصدر قياس الكمية."
          />
          <label className="relative grid h-[300px] cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  setImageUrl(URL.createObjectURL(file));
                  setDone(false);
                }
              }}
            />
            {imageUrl ? (
              <img src={imageUrl} alt="العينة المرفوعة" className="h-full w-full object-cover" />
            ) : (
              <div className="text-center">
                <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <UploadCloud className="h-5 w-5" />
                </span>
                <b className="block text-[11px]">اسحب الصورة هنا أو اضغط للاختيار</b>
                <small className="mt-1 block text-[8px] text-[#8b9a95]">
                  JPG / PNG · صورة واحدة للعينة
                </small>
              </div>
            )}
          </label>

          <div className="my-3 grid gap-3 sm:grid-cols-2">
            <label className="text-[9px] text-[#71817b]">
              مصدر الكمية
              <select className="mt-1 w-full rounded-xl border border-[#dfe8e5] bg-white p-3 text-[10px] text-[#233f36]">
                <option>ميزان أرضي</option>
                <option>ميزان الشاحنة</option>
                <option>LiDAR</option>
                <option>إدخال يدوي</option>
              </select>
            </label>
            <label className="text-[9px] text-[#71817b]">
              الكمية (طن)
              <input
                type="number"
                defaultValue={31}
                min={0}
                step={0.1}
                className="mt-1 w-full rounded-xl border border-[#dfe8e5] bg-white p-3 text-[10px] text-[#233f36]"
              />
            </label>
          </div>

          <button
            onClick={run}
            disabled={!imageUrl || running}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0c8f70] py-3 text-[10px] font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ScanLine className="h-4 w-4" />
            {running ? "جاري تحليل العينة..." : done ? "إعادة تشغيل التحليل" : "تشغيل التحليل التجريبي"}
          </button>
          <p className="mt-2 text-[8px] leading-5 text-[#87958f]">
            لا يتم استنتاج الوزن من الصورة. الوزن يأتي من ميزان الشاحنة أو الميزان
            الأرضي أو LiDAR أو إدخال موثّق.
          </p>
        </Panel>

        <Panel>
          <PanelTitle
            kicker="AI OUTPUT"
            title="نتيجة التحليل"
            right={
              <span className="rounded-lg bg-[#f1f4f3] px-2 py-1 text-[8px] text-[#80908a]">
                {running ? "جاري التحليل" : done ? "اكتمل التحليل" : "بانتظار صورة"}
              </span>
            }
          />

          {!done ? (
            <div className="grid h-[430px] place-items-center text-center">
              <div>
                <BrainCircuit className="mx-auto h-10 w-10 text-emerald-300" />
                <b className="mt-3 block text-xs text-[#62756e]">
                  {running ? "يتم فحص خصائص العينة..." : "لم يتم تشغيل التحليل بعد"}
                </b>
                <p className="mx-auto mt-2 max-w-xs text-[9px] leading-6 text-[#98a49f]">
                  بعد رفع الصورة ستظهر هنا المادة والحالة وقابلية إعادة الاستخدام
                  والتوصية التشغيلية.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-[linear-gradient(135deg,#09281f,#0a4b3a)] p-4 text-white">
                <div>
                  <span className="text-[8px] text-[#a5c8bd]">التصنيف الرئيسي</span>
                  <b className="mt-1 block text-xl">خرسانة مسلحة</b>
                  <small className="text-[8px] text-[#8eb5a9]">
                    Concrete + Reinforcement Steel
                  </small>
                </div>
                <div className="grid h-20 w-20 place-items-center rounded-full border-[6px] border-white/10 border-t-emerald-400 text-center">
                  <div>
                    <b className="text-sm">88%</b>
                    <small className="block text-[6px] text-[#a8c8be]">ثقة تجريبية</small>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  ["الحالة", "صالحة للتدوير بعد الفرز"],
                  ["إمكانية إعادة الاستخدام", "متوسطة"],
                  ["تنبيه التلوث", "لا يوجد مؤشر واضح"],
                  ["الإجراء المقترح", "فصل الحديد ثم تكسير الخرسانة"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[#dfe8e5] bg-[#fbfdfc] p-3">
                    <span className="text-[8px] text-[#87958f]">{label}</span>
                    <b className="mt-1 block text-[10px]">{value}</b>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-xl bg-[#f0f8f5] p-3">
                <span className="text-[8px] font-black text-emerald-700">
                  لماذا هذه النتيجة؟
                </span>
                <p className="mt-1 text-[9px] leading-6 text-[#5d746c]">
                  وجود كتل خرسانية مع عناصر معدنية ظاهرية يجعل الفصل المسبق أفضل
                  قبل توجيه كل مادة لمسارها المناسب.
                </p>
              </div>
            </div>
          )}
        </Panel>
      </div>

      <Panel className="mt-4 border-0 bg-[linear-gradient(135deg,#08241c,#0a4a3a)] text-white">
        <PanelTitle
          kicker="SMART MATCH"
          title="المطابقة التشغيلية المقترحة"
          right={
            <span className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-emerald-200">
              92 / 100
            </span>
          }
        />
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          {[
            ["المصدر", "مشروع إزالة مبنى", "31 طن · مخلفات مختلطة"],
            ["الناقل", "ناقل مؤهل 05", "سعة 22 طن · رحلتان"],
            ["الوجهة", "منشأة تدوير الخرسانة", "سعة متاحة 120 طن"],
          ].map(([label, title, sub], index) => (
            <div key={label} className="contents">
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <span className="text-[8px] text-[#86afa2]">{label}</span>
                <b className="mt-1 block text-xs">{title}</b>
                <small className="mt-1 block text-[8px] text-[#9bb9af]">{sub}</small>
              </div>
              {index < 2 && <RouteIcon className="mx-auto hidden h-4 w-4 text-[#6aa38f] lg:block" />}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["المسافة", "12.8 كم"],
            ["توافق المادة", "مرتفع"],
            ["السعة المتاحة", "كافية"],
            ["حالة الناقل", "متاح خلال 35 دقيقة"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-white/[0.04] p-3">
              <span className="text-[7px] text-[#84a99e]">{label}</span>
              <b className="mt-1 block text-[9px]">{value}</b>
            </div>
          ))}
        </div>
        <p className="mt-3 border-t border-white/10 pt-3 text-[8px] leading-6 text-[#b1cdc4]">
          <b>التفسير:</b> تم ترشيح هذه الوجهة لتوافق نوع المادة مع الاستقبال،
          توفر السعة، وقربها النسبي من المصدر مقارنة بالبدائل التجريبية.
        </p>
      </Panel>
    </>
  );
}

function Network({
  selected,
  onSelect,
}: {
  selected: NetworkNode;
  onSelect: (node: NetworkNode) => void;
}) {
  const [filter, setFilter] = useState<"all" | NetworkNode["kind"]>("all");
  const visible = useMemo(
    () => nodes.filter((node) => filter === "all" || node.kind === filter),
    [filter],
  );

  return (
    <>
      <PageIntro
        eyebrow="NETWORK VISIBILITY"
        title="رؤية موحّدة لجميع الأطراف التشغيلية"
        text="تتبّع المصادر والمنشآت والناقلين والسعة والحالة التشغيلية من شاشة واحدة."
        action={
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "الكل"],
              ["source", "المصادر"],
              ["facility", "المنشآت"],
              ["transport", "الناقلون"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value as typeof filter)}
                className={[
                  "rounded-xl border px-3 py-2 text-[9px] font-bold",
                  filter === value
                    ? "border-[#0c8f70] bg-[#0c8f70] text-white"
                    : "border-[#dfe8e5] bg-white text-[#6d7e77]",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.45fr_.55fr]">
        <Panel className="p-3">
          <NetworkMap selected={selected} onSelect={onSelect} />
        </Panel>

        <Panel>
          <PanelTitle
            kicker="ACTIVE NODES"
            title="النقاط النشطة"
            right={
              <span className="rounded-lg bg-[#eff5f3] px-2 py-1 text-[8px] text-[#617b72]">
                {visible.length} نقاط
              </span>
            }
          />

          <div className="space-y-2">
            {visible.map((node) => (
              <button
                key={node.id}
                onClick={() => onSelect(node)}
                className={[
                  "flex w-full items-center gap-3 rounded-2xl border p-3 text-right transition",
                  selected.id === node.id
                    ? "border-emerald-300 bg-emerald-50/60"
                    : "border-[#dfe8e5] bg-[#fbfdfc] hover:border-emerald-200",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-10 w-10 place-items-center rounded-xl",
                    node.kind === "source"
                      ? "bg-amber-50 text-amber-700"
                      : node.kind === "transport"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-emerald-50 text-emerald-700",
                  ].join(" ")}
                >
                  {node.kind === "source" ? (
                    <Construction className="h-4 w-4" />
                  ) : node.kind === "transport" ? (
                    <Truck className="h-4 w-4" />
                  ) : (
                    <Factory className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block truncate text-[10px]">{node.name}</b>
                  <small className="mt-1 block text-[8px] text-[#92a09b]">
                    {node.id} · {node.material} · {node.quantity}
                  </small>
                </span>
                <span className="rounded-lg bg-white px-2 py-1 text-[7px] text-[#0c8066] shadow-sm">
                  {node.status}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-[#0b2b22] p-4 text-white">
            <span className="text-[8px] text-[#9bc1b5]">النقطة المحددة</span>
            <b className="mt-1 block text-sm">{selected.name}</b>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[8px]">
              <div className="rounded-xl bg-white/5 p-2">
                <span className="text-[#88aaa0]">المادة</span>
                <b className="mt-1 block">{selected.material}</b>
              </div>
              <div className="rounded-xl bg-white/5 p-2">
                <span className="text-[#88aaa0]">الكمية/السعة</span>
                <b className="mt-1 block">{selected.quantity}</b>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

function Transport() {
  return (
    <>
      <PageIntro
        eyebrow="TRANSPORT CONTROL"
        title="تتبّع كل رحلة من التحميل حتى إثبات التسليم"
        text="حالة الناقل، المادة، المصدر، الوجهة، الوزن وخطوات التحقق في سجل تشغيلي واحد."
        action={
          <button className="rounded-xl bg-[#0c8f70] px-4 py-3 text-[10px] font-extrabold text-white">
            + إنشاء رحلة
          </button>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["مجدولة", "5", Clock3, "amber"],
          ["قيد النقل", "4", Truck, "blue"],
          ["تم التسليم", "38", CheckCircle2, "emerald"],
          ["متوسط زمن الرحلة", "54 د", Gauge, "violet"],
        ].map(([label, value, Icon, tone]) => {
          const C = Icon as typeof Clock3;
          return (
            <article key={label as string} className="rounded-[18px] border border-[#dfe8e5] bg-white p-4">
              <div className="flex items-center justify-between text-[10px] text-[#71817b]">
                <span>{label as string}</span>
                <span className={"grid h-9 w-9 place-items-center rounded-xl " + toneClasses[tone as string]}>
                  <C className="h-4 w-4" />
                </span>
              </div>
              <b className="mt-3 block text-3xl">{value as string}</b>
            </article>
          );
        })}
      </div>

      <Panel className="overflow-hidden p-0">
        <div className="flex flex-col justify-between gap-3 border-b border-[#dfe8e5] p-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-[8px] font-black tracking-[0.16em] text-[#0c8f70]">MISSION LOG</span>
            <h3 className="mt-1 text-[15px] font-extrabold">الرحلات الأخيرة</h3>
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-[#dfe8e5] bg-[#fbfdfc] px-3 py-2">
            <Search className="h-3 w-3 text-[#8a9893]" />
            <input
              placeholder="بحث برقم الرحلة أو المادة"
              className="w-52 bg-transparent text-[9px] outline-none"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-right">
            <thead className="bg-[#fafcfb] text-[8px] text-[#84938d]">
              <tr>
                {["الرحلة", "المادة", "المصدر", "الوجهة", "الكمية", "الناقل", "الحالة"].map((head) => (
                  <th key={head} className="border-b border-[#e9efed] px-4 py-3 font-bold">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission[0]} className="text-[9px] text-[#405b52]">
                  {mission.map((cell, index) => (
                    <td key={index} className="border-b border-[#edf2f0] px-4 py-4">
                      {index === 0 ? <b className="text-[10px]">{cell}</b> : index === 6 ? (
                        <span
                          className={[
                            "rounded-lg px-2 py-1 text-[7px] font-bold",
                            cell === "تم التسليم"
                              ? "bg-emerald-50 text-emerald-700"
                              : cell === "قيد النقل"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700",
                          ].join(" ")}
                        >
                          {cell}
                        </span>
                      ) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function Evidence() {
  return (
    <>
      <PageIntro
        eyebrow="MVP EVIDENCE"
        title="ماذا يثبت النموذج فعليًا؟"
        text="الـMVP يعرض تدفقًا متكاملًا من تسجيل المخلفات حتى القرار والنقل والتوثيق، مع بيانات محاكاة قابلة للعرض أمام لجنة الهاكاثون."
        action={
          <span className="rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-[9px] font-bold text-violet-700">
            30-Day Simulation
          </span>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["27", "طلب مخلفات", "تم تسجيله داخل السيناريو"],
          ["61", "مطابقة تشغيلية", "بين المصدر والوجهة والناقل"],
          ["47", "رحلة نقل", "بمراحل تشغيل موثقة"],
          ["92", "صورة مخلفات", "ضمن تجربة التحليل المرئي"],
        ].map(([value, label, note]) => (
          <article key={label} className="rounded-[18px] border border-[#dfe8e5] bg-white p-5 text-center">
            <b className="block text-3xl text-[#0c8f70]">{value}</b>
            <span className="mt-1 block text-[10px] font-extrabold">{label}</span>
            <small className="mt-1 block text-[8px] text-[#8c9a95]">{note}</small>
          </article>
        ))}
      </div>

      <Panel className="mt-4">
        <PanelTitle kicker="END-TO-END FLOW" title="مسار الإثبات" />
        <div className="grid gap-2 lg:grid-cols-5">
          {[
            ["1", "تسجيل المخلفات", "الموقع + الصور + نوع المشروع"],
            ["2", "تحليل وتصنيف", "نوع المادة + الحالة"],
            ["3", "تأكيد الكمية", "ميزان / LiDAR / إدخال"],
            ["4", "مطابقة ذكية", "منشأة + ناقل"],
            ["5", "إثبات التسليم", "وزن + وقت + استلام"],
          ].map(([num, title, note]) => (
            <div key={num} className="rounded-2xl border border-[#dfe8e5] bg-[#f8fbfa] p-4 text-center">
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-xl bg-[#0c8f70] text-[9px] font-black text-white">
                {num}
              </span>
              <b className="mt-2 block text-[10px]">{title}</b>
              <small className="mt-1 block text-[8px] text-[#8d9b96]">{note}</small>
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Panel>
          <PanelTitle kicker="VALIDATED CAPABILITIES" title="وظائف ممثلة في النموذج" />
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "تسجيل طلب مخلفات من موقع إنشاء",
              "رفع صورة وتحليل مرئي تجريبي",
              "فصل قياس الوزن عن تحليل الصورة",
              "مطابقة حسب المادة والمسافة والسعة",
              "ربط ناقل مؤهل بالرحلة",
              "تتبع الحالة حتى التسليم",
              "لوحة مؤشرات وتقارير تشغيلية",
              "ذاكرة تشغيلية تستخلص أنماطًا متكررة",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl bg-[#f6faf8] p-3 text-[9px] text-[#48635a]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle kicker="READINESS" title="جاهزية النموذج" />
          <div className="py-4 text-center">
            <b className="block text-4xl text-[#0c8f70]">78%</b>
            <span className="text-[8px] text-[#87958f]">Presentation Ready</span>
          </div>
          <div className="space-y-3">
            {[
              ["تجربة المستخدم", 92],
              ["تدفق العمليات", 88],
              ["البيانات الحقيقية", 35],
              ["تكاملات الأنظمة", 28],
            ].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-1 flex justify-between text-[8px] text-[#70817a]">
                  <span>{label as string}</span>
                  <b>{value as number}%</b>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#edf2f0]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#0a8f70,#31c79a)]"
                    style={{ width: (value as number) + "%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function Reports() {
  const exportCsv = () => {
    const rows = [
      ["Metric", "Value"],
      ["Registered waste (t)", "486"],
      ["Smart matches", "61"],
      ["Active missions", "9"],
      ["Diversion rate", "71%"],
    ];
    const csv = "\uFEFF" + rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mwan-mvp-report.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageIntro
        eyebrow="REPORTS & OPERATIONAL MEMORY"
        title="تحويل التشغيل اليومي إلى معرفة قابلة لإعادة الاستخدام"
        text="ملخصات تشغيلية، مؤشرات استدامة، وأنماط متكررة تساعد على تحسين القرار في الجولات القادمة."
        action={
          <div className="flex gap-2">
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-xl border border-[#dfe8e5] bg-white px-3 py-2 text-[9px] font-bold"
            >
              <Download className="h-3 w-3" /> CSV
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0c8f70] px-3 py-2 text-[9px] font-bold text-white"
            >
              <FileText className="h-3 w-3" /> PDF / Print
            </button>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.45fr_.55fr]">
        <Panel>
          <PanelTitle kicker="30-DAY PERFORMANCE" title="الأداء التشغيلي" />
          <div className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid stroke="#edf2f0" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="registered" fill="#cce7df" radius={[6, 6, 0, 0]} />
                <Bar dataKey="redirected" fill="#0a8f70" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="bg-[linear-gradient(180deg,#fff,#f4faf7)]">
          <PanelTitle kicker="CARBON VIEW" title="مؤشر الأثر" />
          <div className="py-6 text-center">
            <Leaf className="mx-auto h-7 w-7 text-emerald-600" />
            <span className="mt-2 block text-[8px] text-[#789087]">تقدير تجريبي</span>
            <b className="mt-1 block text-4xl text-[#0c8f70]">–24.6</b>
            <small className="mt-1 block text-[8px] text-[#8c9a95]">
              طن CO₂e مقابل سيناريو التخلص المرجعي*
            </small>
          </div>
          <div className="space-y-2">
            {[
              ["المسافة المقطوعة", "1,284 كم"],
              ["الكمية المعاد توجيهها", "345 طن"],
              ["نسبة التحويل", "71%"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-[#e6eeeb] py-2 text-[8px]">
                <span className="text-[#7a8a84]">{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[7px] leading-5 text-[#98a49f]">
            *قيمة عرض مبنية على افتراضات محاكاة وليست حسابًا رسميًا معتمدًا.
          </p>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel>
          <PanelTitle
            kicker="OPERATIONAL MEMORY"
            title="أنماط التقطها النظام"
            right={
              <span className="rounded-lg bg-[#eff5f3] px-2 py-1 text-[8px] text-[#617b72]">
                4 Insights
              </span>
            }
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["01", "الخرسانة أعلى مادة في الطلبات", "تمثل قرابة 48% من الكميات في سيناريو الـ30 يوم."],
              ["02", "الوجهات القريبة تسرّع المطابقة", "الطلبات ضمن نطاق أقصر وصلت لقرار تشغيلي أسرع."],
              ["03", "الحديد يحتاج مسارًا مستقلًا", "فصل الحديد قبل النقل رفع وضوح التوجيه النهائي للمادة."],
              ["04", "السعة التشغيلية عامل حاسم", "توفر السعة قد يغيّر الاختيار حتى مع وجود وجهة أقرب."],
            ].map(([num, title, note]) => (
              <div key={num} className="flex gap-3 rounded-2xl border border-[#dfe8e5] bg-[#fbfdfc] p-3">
                <span className="text-[8px] font-black text-[#0c8f70]">{num}</span>
                <div>
                  <b className="text-[9px]">{title}</b>
                  <p className="mt-1 text-[8px] leading-5 text-[#87958f]">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle kicker="REPORT ARCHIVE" title="تقارير جاهزة" />
          <div className="space-y-1">
            {[
              ["التقرير التشغيلي اليومي", "29 سبتمبر 2026 · 12 صفحة", BarChart3],
              ["ملخص أداء الـ30 يوم", "الكميات · المطابقات · الرحلات", Database],
              ["تقرير الاستدامة التجريبي", "التحويل عن التخلص والأثر", Leaf],
            ].map(([title, note, Icon]) => {
              const C = Icon as typeof BarChart3;
              return (
                <div key={title as string} className="flex items-center gap-3 border-b border-[#edf2f0] py-3 last:border-0">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <C className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <b className="block text-[9px]">{title as string}</b>
                    <small className="text-[8px] text-[#92a09b]">{note as string}</small>
                  </div>
                  <button className="rounded-lg border border-[#dfe8e5] px-2 py-1 text-[7px] text-[#667c74]">
                    فتح
                  </button>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}
