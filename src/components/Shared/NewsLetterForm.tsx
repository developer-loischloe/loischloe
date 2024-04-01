"use client";

import React from "react";

const NewsLetterForm = () => {
  return (
    <form className="bg-white rounded-full overflow-hidden flex justify-between">
      <input
        name="email"
        type="email"
        placeholder="Enter Your Email"
        className="border-none outline-none flex-1 text-black px-5 py-3"
      />
      <button type="submit" className="bg-brand_primary px-7">
        Subscribe
      </button>
    </form>
  );
};

export default NewsLetterForm;
