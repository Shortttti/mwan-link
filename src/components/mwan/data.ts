import wood from "@/assets/material-wood.jpg";
import cardboard from "@/assets/material-cardboard.jpg";
import metal from "@/assets/material-metal.jpg";
import building from "@/assets/material-building.jpg";

export const materials = [
  { id: "wood-jeddah", title: "طبالي خشبية قابلة لإعادة الاستخدام", type: "خشب", quantity: "500 كجم", city: "جدة", distance: "4.2 كم", condition: "جيدة", images: 4, verified: "تحليل بصري بالذكاء الاصطناعي", image: wood, lat: "38%", lng: "31%" },
  { id: "cardboard-madinah", title: "كرتون مضغوط ونظيف", type: "كرتون", quantity: "800 كجم", city: "المدينة المنورة", distance: "18 كم", condition: "جيدة", images: 3, verified: "بيانات مؤكدة من المنتج", image: cardboard, lat: "56%", lng: "61%" },
  { id: "metal-makkah", title: "صفائح ومقاطع معدنية", type: "معدن", quantity: "300 كجم", city: "مكة المكرمة", distance: "72 كم", condition: "متوسطة", images: 5, verified: "تحليل بصري بالذكاء الاصطناعي", image: metal, lat: "66%", lng: "42%" },
  { id: "building-jeddah", title: "بلاط وبلوك بناء فائض", type: "مواد بناء", quantity: "2 طن", city: "جدة", distance: "7.8 كم", condition: "جيدة", images: 6, verified: "تم التحقق ميدانيًا", image: building, lat: "31%", lng: "72%" },
];

export const meta = (title: string, description: string) => ({ meta: [
  { title: `${title} | موان` },
  { name: "description", content: description },
  { property: "og:title", content: `${title} | موان` },
  { property: "og:description", content: description },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
] });