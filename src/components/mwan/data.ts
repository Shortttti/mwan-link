import wood from "@/assets/material-wood.jpg";
import cardboard from "@/assets/material-cardboard.jpg";
import metal from "@/assets/material-metal.jpg";
import building from "@/assets/material-building.jpg";

export const materials = [
  { id: "wood-jeddah", title: "طبالي خشبية قابلة لإعادة الاستخدام", type: "خشب", quantity: "500 كجم", city: "جدة", distance: "4.2 كم", condition: "جيدة", images: 4, verified: "تقييم بصري تجريبي", image: wood, lat: 21.4858, lng: 39.1925 },
  { id: "cardboard-madinah", title: "كرتون مضغوط ونظيف", type: "كرتون", quantity: "800 كجم", city: "المدينة المنورة", distance: "18 كم", condition: "جيدة", images: 3, verified: "بيانات تجريبية", image: cardboard, lat: 24.5247, lng: 39.5692 },
  { id: "metal-makkah", title: "صفائح ومقاطع معدنية", type: "معدن", quantity: "300 كجم", city: "مكة المكرمة", distance: "72 كم", condition: "متوسطة", images: 5, verified: "تقييم بصري تجريبي", image: metal, lat: 21.3891, lng: 39.8579 },
  { id: "building-jeddah", title: "بلاط وبلوك بناء فائض", type: "مواد بناء", quantity: "2 طن", city: "جدة", distance: "7.8 كم", condition: "جيدة", images: 6, verified: "بيانات تجريبية", image: building, lat: 21.4938, lng: 39.2055 },
];

export const meta = (title: string, description: string) => ({ meta: [
  { title: `${title} | موان` },
  { name: "description", content: description },
  { property: "og:title", content: `${title} | موان` },
  { property: "og:description", content: description },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
] });
