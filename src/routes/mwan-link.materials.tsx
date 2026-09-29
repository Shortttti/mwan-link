import { Outlet, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/mwan-link/materials")({ component: () => <Outlet /> });