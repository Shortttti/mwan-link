import { createFileRoute } from "@tanstack/react-router";
import { SmartMatching } from "@/components/mwan/MaterialsPages";
import { meta } from "@/components/mwan/data";
export const Route = createFileRoute("/mwan-link/matching")({ head: () => meta("المطابقة الذكية", "اقتراحات ذكية لمطابقة المواد بالاحتياجات."), component: SmartMatching });