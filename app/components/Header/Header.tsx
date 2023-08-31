"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
    <div className='h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2'>
      <div className='text-center mt-10'>
        <h1 className='text-white text-4xl font-bold mb-2'>
          Find your table for any occation
        </h1>
        {/* SEARCH BAR */}
        <div className='text-left py-3 m-auto flex justify-center'>
          <input
            type='text'
            className='rounded text-lg mr-3 w-74 p-2 w-[450px] bg-white'
            placeholder='Location, Restaurant, or Cuisine'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className='rounded bg-red-600 px-9 py-2 text-white'
            onClick={() => {
              if (location === "banana") return;
              router.push("/search");
            }}
          >
            Let's go
          </button>
        </div>
        {/* SEARCH BAR */}
      </div>
    </div>
  );
}
