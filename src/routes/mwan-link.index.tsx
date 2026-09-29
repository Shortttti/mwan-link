import { createFileRoute } from "@tanstack/react-router";
import { MwanLinkLanding } from "@/components/mwan/HomePages";
import { meta } from "@/components/mwan/data";

export const Route = createFileRoute("/mwan-link/")({ head: () => meta("موان لينك", "خدمة ذكية تربط المواد القابلة للاستفادة بالجهات التي تحتاجها."), component: MwanLinkLanding });