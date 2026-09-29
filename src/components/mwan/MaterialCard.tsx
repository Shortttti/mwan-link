import { Link } from "@tanstack/react-router";
import { CheckCircle2, Images, MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { materials } from "./data";

export function MaterialCard({ material }: { material: (typeof materials)[number] }) {
  return <Card className="overflow-hidden border-border shadow-card">
    <img src={material.image} alt={material.title} loading="lazy" width={1200} height={800} className="aspect-[16/9] w-full object-cover" />
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-3"><div><Badge variant="secondary">{material.type}</Badge><h3 className="mt-3 font-bold leading-6">{material.title}</h3></div><strong className="shrink-0 text-primary">{material.quantity}</strong></div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground"><span className="flex items-center gap-1.5"><MapPin className="size-4 text-primary" />{material.city}</span><span className="flex items-center gap-1.5"><Navigation className="size-4 text-primary" />{material.distance}</span><span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-success" />{material.condition}</span><span className="flex items-center gap-1.5"><Images className="size-4 text-primary" />{material.images} صور</span></div>
      <div className="mt-4 border-t border-border pt-4"><p className="mb-4 flex items-center gap-2 text-xs text-success"><CheckCircle2 className="size-4" />{material.verified}</p><Button asChild variant="outline" className="w-full"><Link to="/mwan-link/materials/$materialId" params={{ materialId: material.id }}>عرض التفاصيل</Link></Button></div>
    </CardContent>
  </Card>;
}