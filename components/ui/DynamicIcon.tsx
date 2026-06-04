"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps extends LucideIcons.LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = (LucideIcons[name as keyof typeof LucideIcons] || LucideIcons.BookOpen) as React.ComponentType<LucideIcons.LucideProps>;
  return <Icon {...props} />;
}
