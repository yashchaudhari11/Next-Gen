"use client";

import React from "react";
import ErrorTile from "./ErrorTile";

interface ErrorTileWrapperProps {
  message: string;
}

export default function ErrorTileWrapper({ message }: ErrorTileWrapperProps) {
  const handleUseDemo = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("demo", "true");
    window.location.href = url.toString();
  };

  return <ErrorTile message={message} onUseDemo={handleUseDemo} />;
}
