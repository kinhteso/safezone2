export type School = {
  id: string;
  name: string;
  code: string;
  type: "thcs" | "thpt" | "university" | "other";
  province?: string | null;
  contact_email?: string | null;
  active: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  excerpt?: string | null;
  thumbnail?: string | null;
  category: "news" | "knowledge" | "law" | "research";
  tags?: string[] | null;
  published: boolean;
  view_count: number;
  school_id?: string | null;
  created_at: string;
  updated_at: string;
};

export type Report = {
  id: string;
  ref_code: string;
  category: "use" | "deal" | "pressure" | "other";
  description: string;
  area?: string | null;
  school_name?: string | null;
  school_id?: string | null;
  status: "pending" | "reviewed" | "forwarded" | "closed";
  ip_hash?: string | null;
  admin_note?: string | null;
  created_at: string;
};

export type ChatSession = {
  id: string;
  session_token: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  msg_count: number;
  school_id?: string | null;
  created_at: string;
  last_active: string;
};

export type DailyStat = {
  id: string;
  school_id: string;
  date: string;
  page_views: number;
  chat_sessions: number;
  chat_messages: number;
  reports_count: number;
  articles_read: number;
};
