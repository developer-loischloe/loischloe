"use client";

import React from "react";
import { CustomChat, FacebookProvider } from "react-facebook";

const FacebookMessanger = () => {
  return (
    <div>
      <FacebookProvider appId="3086454048152154">
        <CustomChat pageId="106519769015566" minimized={true} />
      </FacebookProvider>
    </div>
  );
};

export default FacebookMessanger;
