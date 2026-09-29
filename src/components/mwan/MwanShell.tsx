import { Link } from "@tanstack/react-router";
import { Bell, ChevronLeft, Globe2, Menu, Search, UserRound, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import officialLogo from "@/assets/mwan-official-logo.png";

const navItems = [
  { label: "الرئيسية", to: "/" as const },
  { label: "الخدمات الإلكترونية", to: "/mwan-link" as const },
  { label: "موان لينك", to: "/mwan-link/materials" as const },
  { label: "لوحة التحكم", to: "/mwan-link/dashboard" as const },
];

export function MwanMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center" aria-label="موان - الصفحة الرئيسية">
      <img src={officialLogo} alt="شعار المركز الوطني لإدارة النفايات موان" className={compact ? "h-8 w-auto" : "h-12 w-auto max-w-[220px] object-contain"} />
    </Link>
  );
}

export function MwanShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div dir="rtl" className="min-h-screen bg-background font-sans text-foreground">
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <span>الموقع الرسمي للمركز الوطني لإدارة النفايات</span>
          <div className="flex items-center gap-4"><span className="hidden sm:inline">تواصل معنا</span><span className="flex items-center gap-1"><Globe2 className="size-3.5" /> English</span></div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <MwanMark />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
            {navItems.map((item) => <Link key={item.label} to={item.to} activeProps={{ className: "text-primary font-bold" }} className="text-sm font-medium text-foreground transition-colors hover:text-primary">{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="البحث"><Search /></Button>
            <Button variant="ghost" size="icon" aria-label="الإشعارات"><Bell /></Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex"><UserRound /> تسجيل الدخول</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="فتح القائمة" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {open && <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">{navItems.map((item) => <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-3 text-sm font-medium last:border-0">{item.label}<ChevronLeft className="size-4" /></Link>)}</nav>}
      </header>
      <main>{children}</main>
      <footer className="mt-16 bg-footer text-footer-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div><MwanMark /><p className="mt-4 max-w-sm text-sm leading-7 text-footer-muted">نعمل على تنظيم قطاع إدارة النفايات وتحفيز الاقتصاد الدائري لتحقيق بيئة مستدامة.</p></div>
          <div><h2 className="font-bold">روابط مهمة</h2><div className="mt-4 grid gap-3 text-sm text-footer-muted"><Link to="/mwan-link">الخدمات الإلكترونية</Link><Link to="/mwan-link/materials">المواد المتاحة</Link><Link to="/mwan-link/dashboard">لوحة التحكم</Link></div></div>
          <div><h2 className="font-bold">تواصل معنا</h2><p className="mt-4 text-sm leading-7 text-footer-muted">الرقم الموحد: 19913<br />المملكة العربية السعودية</p></div>
        </div>
        <div className="border-t border-footer-border"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-5 text-xs text-footer-muted sm:px-6 lg:px-8"><span>جميع الحقوق محفوظة للمركز الوطني لإدارة النفايات © 2026</span><span>سياسة الخصوصية · شروط الاستخدام</span></div></div>
      </footer>
    </div>
  );
}

export function PageIntro({ title, description, crumbs = [] }: { title: string; description?: string; crumbs?: string[] }) {
  return (
    <div className="border-b border-border bg-section">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><Link to="/">الرئيسية</Link><ChevronLeft className="size-3" />{crumbs.map((crumb, index) => <span key={crumb} className="flex items-center gap-2"><span>{crumb}</span>{index < crumbs.length - 1 && <ChevronLeft className="size-3" />}</span>)}</div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {description && <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>}
      </div>
    </div>
  );
}
