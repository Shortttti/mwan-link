import { useEffect, useState } from "react";
import { materials, type Material } from "./data";

const STORAGE_KEY = "mwan-link.user-materials.v1";
const COMPLETED_KEY = "mwan-link.completed-materials.v1";
const CHANGE_EVENT = "mwan-link:materials-changed";

function readSavedMaterials(): Material[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((item) => item && typeof item.id === "string") : [];
  } catch { return []; }
}

function readCompletedIds(): string[] {
  try {
    const completed = JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");
    return Array.isArray(completed) ? completed.filter((id): id is string => typeof id === "string") : [];
  } catch { return []; }
}

export function useMaterials() {
  const [saved, setSaved] = useState<Material[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  useEffect(() => {
    const refresh = () => { setSaved(readSavedMaterials()); setCompletedIds(readCompletedIds()); };
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(CHANGE_EVENT, refresh); window.removeEventListener("storage", refresh); };
  }, []);
  const addMaterial = (material: Material) => {
    const next = [material, ...readSavedMaterials()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };
  const completeMaterial = (id: string) => {
    const next = Array.from(new Set([...readCompletedIds(), id]));
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };
  const allMaterials = [...saved, ...materials];
  return { materials: allMaterials, availableMaterials: allMaterials.filter((material) => !completedIds.includes(material.id)), completedIds, addMaterial, completeMaterial };
}

export function imageFileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("تعذر تجهيز الصورة."));
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
