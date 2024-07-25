"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("5355c850-3a55-40bb-bd9f-8fe24b60d02b");
  }, []);

  return null;
};

export const CrispProvider = () => {
  return <CrispChat />;
};
