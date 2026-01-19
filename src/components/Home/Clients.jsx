// src/components/Home/Clients.jsx
import React from "react";

const clientLogos = [
  "/images/clients/client1.jpg",
  "/images/clients/client2.jpg",
  "/images/clients/client3.jpg",
  "/images/clients/client4.jpg",
  "/images/clients/client5.jpg",
];

export default function Clients() {
  return (
    <section className="bg-gray-500 py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Our Clients
      </h2>

      <div className="overflow-hidden">
        <div className="marquee-track">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-24 w-auto mr-12 object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
