import { createFileRoute } from "@tanstack/react-router";
import { MwanHome } from "@/components/mwan/HomePages";
import { meta } from "@/components/mwan/data";

export const Route = createFileRoute("/")({ head: () => meta("المركز الوطني لإدارة النفايات", "منصة موان للخدمات الإلكترونية وإدارة قطاع النفايات."), component: MwanHome });
