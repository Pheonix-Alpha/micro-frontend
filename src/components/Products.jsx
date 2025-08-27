import { ShoppingCart } from "lucide-react";
const products = [
  { name: "Tractor", price: "₹5,00,000" },
  { name: "Irrigation Pump", price: "₹15,000" },
  { name: "Organic Fertilizer", price: "₹500" },
  { name: "Seeds Pack", price: "₹200" },
  { name: "Crop Protection Kit", price: "₹2,000" },
  { name: "Farm Tools Set", price: "₹1,200" },
];

export default function Products(){
    return (
        <section id="products" className="py-12 bg-green-50 px-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-green-700">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product,idx)=>(
                    <div key={idx} className="p-4 border rounded-lg shadow hover:shadow-lg text-center">
                    <ShoppingCart size={40} className="mx-auto text-green-600"/>
                    <p className="mt-2 font-semibold">{product.name}</p>
                    <p className="text-gray-600">{product.price}</p>
                    </div>
                ))}
            </div>

            </section>

    );
}