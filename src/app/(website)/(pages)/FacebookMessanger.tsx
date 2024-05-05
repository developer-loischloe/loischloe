"use client";

import React from "react";
import { CustomChat, FacebookProvider } from "react-facebook";

const FacebookMessanger = () => {
  const appId = String(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID);
  const pageId = String(process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID);

  return (
    <div>
      <FacebookProvider appId={appId}>
        <CustomChat pageId={pageId} minimized={true} />
      </FacebookProvider>
    </div>
  );
};

export default FacebookMessanger;
