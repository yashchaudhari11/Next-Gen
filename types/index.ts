export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface User {
  name: string;
  streak: number;
  avatar_initials: string;
  plan: "Free" | "Pro" | "Team";
}
