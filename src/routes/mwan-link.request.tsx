import { createFileRoute } from "@tanstack/react-router";
import { RequestJourney } from "@/components/mwan/MaterialsPages";
import { meta } from "@/components/mwan/data";
export const Route = createFileRoute("/mwan-link/request")({
  validateSearch: (search: Record<string, unknown>) => ({ materialId: typeof search.materialId === "string" ? search.materialId : undefined }),
  head: () => meta("متابعة الطلب", "متابعة طلب المادة والنقل والاستلام عبر منظومة موان."),
  component: Page,
});

function Page() {
  const { materialId } = Route.useSearch();
  return <RequestJourney materialId={materialId} />;
}
