import { createFileRoute } from "@tanstack/react-router";
import { RequestJourney } from "@/components/mwan/MaterialsPages";
import { meta } from "@/components/mwan/data";
export const Route = createFileRoute("/mwan-link/request")({ head: () => meta("متابعة الطلب", "متابعة طلب المادة والنقل والاستلام عبر منظومة موان."), component: RequestJourney });