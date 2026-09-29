import { createFileRoute } from "@tanstack/react-router";
import { MaterialDetails } from "@/components/mwan/MaterialsPages";
import { meta } from "@/components/mwan/data";
export const Route = createFileRoute("/mwan-link/materials/$materialId")({ head: () => meta("تفاصيل المادة", "تفاصيل المادة ومستوى التحقق في موان لينك."), component: Page });
function Page(){ const { materialId } = Route.useParams(); return <MaterialDetails materialId={materialId}/>; }