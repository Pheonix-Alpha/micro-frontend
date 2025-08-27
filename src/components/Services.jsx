import React from "react";
import { Tractor, Leaf, Droplet, Users, Shield } from "lucide-react";


const services = [
  { icon: <Tractor size={40} className="mx-auto text-green-600" />, name: "Farm Equipment" },
  { icon: <Leaf size={40} className="mx-auto text-green-600" />, name: "Organic Fertilizers" },
  { icon: <Droplet size={40} className="mx-auto text-green-600" />, name: "Irrigation Support" },
  { icon: <Users size={40} className="mx-auto text-green-600" />, name: "Farmer Training" },
  { icon: <Shield size={40} className="mx-auto text-green-600" />, name: "Crop Insurance" },
];

export default function Service(){
    return(
       <section id="services" className="py-12 bg-white px-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-700">Our services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {services.map((service,idx)=> (
            <div key={idx} className="p-4 border rounded-lg shadow hover:shadow-lg">{service.icon}
            <p className="mt-2 font-semibold">{service.name}</p>
            </div>
        ))}
        </div>
       </section>
    )
}