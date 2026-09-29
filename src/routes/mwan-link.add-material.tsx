import { createFileRoute } from "@tanstack/react-router";
import { AddMaterial } from "@/components/mwan/ProducerPages";
import { meta } from "@/components/mwan/data";
export const Route = createFileRoute("/mwan-link/add-material")({ head: () => meta("إضافة مادة جديدة", "إضافة مادة قابلة للاستفادة والتحقق من صورها."), component: AddMaterial });