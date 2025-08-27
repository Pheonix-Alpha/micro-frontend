import React from "react";

const news = [
  "🌱 Government announces subsidy on organic fertilizers",
  "🚜 New irrigation projects launched in rural areas",
  "📢 Farmer training workshops to be held next month",
];

export default function News() {
  return (
    <section id="news" className="py-12 bg-white px-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-green-700">News & Updates</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {news.map((item, idx) => (
          <div key={idx} className="p-4 border rounded-lg shadow hover:shadow-md">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
