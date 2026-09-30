import { createFileRoute } from "@tanstack/react-router";
import { MaterialsBrowse } from "@/components/mwan/MaterialsPages";
import { meta } from "@/components/mwan/data";
export const Route = createFileRoute("/mwan-link/materials/")({ head: () => meta("المواد المتاحة", "البحث عن المواد القابلة للاستفادة عبر وصال."), component: MaterialsBrowse });