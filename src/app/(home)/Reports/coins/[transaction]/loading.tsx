import React from "react";

export default function loading() {
  return (
    <div className="fixed z-[9999] bg-black bg-opacity-20 top-0 left-0 w-full h-screen">
    <div className="w-full h-screen relative  flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-600"></div>
    </div>
  </div>
    )
};
