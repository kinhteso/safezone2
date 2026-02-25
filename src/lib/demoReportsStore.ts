import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export type DemoReport = {
  id: string;
  ref_code: string;
  category: "use" | "deal" | "pressure" | "other";
  area: string | null;
  status: "pending" | "reviewed" | "forwarded" | "closed";
  created_at: string;
  description?: string;
  school_name?: string | null;
};

const STORE_PATH = path.join(process.cwd(), "tmp", "demo-reports.json");

function isValidDemoReport(input: unknown): input is DemoReport {
  if (!input || typeof input !== "object") return false;
  const item = input as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.ref_code === "string" &&
    typeof item.category === "string" &&
    typeof item.created_at === "string"
  );
}

export function isMissingReportsTableError(message?: string) {
  return (
    typeof message === "string" &&
    message.includes("Could not find the table 'public.reports'")
  );
}

export async function readDemoReports(): Promise<DemoReport[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidDemoReport).sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  } catch {
    return [];
  }
}

async function writeDemoReports(items: DemoReport[]) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(items, null, 2), "utf8");
}

export async function appendDemoReport(input: {
  category: DemoReport["category"];
  area?: string;
  description?: string;
  school_name?: string | null;
}) {
  const now = new Date();
  const report: DemoReport = {
    id: crypto.randomUUID(),
    ref_code: `#SZ-DEMO-${now.getTime().toString().slice(-8)}`,
    category: input.category,
    area: input.area ?? null,
    status: "pending",
    created_at: now.toISOString(),
    description: input.description,
    school_name: input.school_name ?? null,
  };

  const current = await readDemoReports();
  await writeDemoReports([report, ...current]);
  return report;
}
