"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

const SendGTMEvent = ({ params }: { params: object }) => {
  //
  useEffect(() => {
    sendGTMEvent(params);
  }, []);
  return null;
};

export default SendGTMEvent;
