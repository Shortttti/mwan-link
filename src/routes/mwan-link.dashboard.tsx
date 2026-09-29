import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/mwan/ProducerPages";
import { meta } from "@/components/mwan/data";
export const Route = createFileRoute("/mwan-link/dashboard")({ head: () => meta("لوحة تحكم موان لينك", "متابعة المواد والطلبات والنقل في موان لينك."), component: Dashboard });