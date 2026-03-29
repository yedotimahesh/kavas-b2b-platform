"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const products = [
  {
    id: "1",
    title: "Wireless Earbuds TWS Pro Bulk",
    price: 580,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    brand: "TechLink",
  },
  {
    id: "2",
    title: "Power Bank 20000mAh OEM",
    price: 750,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
    brand: "EnergyTech",
  },
];

export default function ProductView() {
  const { id } = useParams();

  const product = products.find((p) => p.id === id) || products[0];

  const [qty, setQty] = useState(50);

  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  // 🔥 Add to Cart API
  const addToCart = async () => {
    try {
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: qty,
        }),
      });

      alert("Added to cart ✅");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT IMAGE */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-4 rounded-xl shadow"
        >
          <img
            src={product.image}
            alt=""
            className="w-full h-[400px] object-contain"
          />
        </motion.div>

        {/* RIGHT DETAILS */}
        <div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-yellow-500 mt-1">
            ⭐ 4.8 (124 reviews) • {product.brand}
          </p>

          {/* PRICING TIERS */}
          <div className="bg-yellow-100 p-4 rounded-lg mt-4 border">
            <p className="font-semibold mb-3">
              💰 Bulk pricing tiers — save more when you order more:
            </p>

            <div className="flex gap-3 flex-wrap">
              {[
                { range: "50-99", price: 580 },
                { range: "100-249", price: 539 },
                { range: "250-499", price: 505 },
                { range: "500+", price: 464 },
              ].map((tier, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="border px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-200 transition"
                >
                  {tier.range} units
                  <div className="text-orange-600 font-bold">
                    ₹{tier.price}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm">Quantity:</span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decrease}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>

              <span className="px-4">{qty}</span>

              <button
                onClick={increase}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <span className="text-xs text-gray-500">
              Min. 50 units
            </span>
          </div>

          {/* BUTTONS */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            🛒 Add to Cart
          </motion.button>

          <button className="w-full mt-3 border py-3 rounded-lg hover:bg-gray-200">
            📩 Send Enquiry
          </button>

          <button className="w-full mt-3 border py-3 rounded-lg hover:bg-gray-200">
            ❤️ Save
          </button>

          {/* SPECIFICATIONS */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Product Specifications
            </h3>

            <div className="text-sm space-y-1 text-gray-600">
              <p>Brand: {product.brand}</p>
              <p>Type: TWS Earbuds</p>
              <p>Battery: 6+24hr</p>
              <p>Bluetooth: 5.3</p>
              <p>Water: IPX5</p>
              <p>MOQ: 50 units</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}