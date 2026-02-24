import { NextResponse } from "next/server";
export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "Missing GOOGLE_API_KEY" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { message: "Unable to list models.", detail: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    const models = (data.models ?? []) as Array<{
      name: string;
      supportedGenerationMethods?: string[];
    }>;
    const available = models
      .filter((model) =>
        model.supportedGenerationMethods?.includes("generateContent")
      )
      .map((model) => model.name);

    return NextResponse.json({ models: available });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to list models.",
        detail:
          process.env.NODE_ENV === "development"
            ? String((error as Error)?.message ?? error)
            : undefined,
      },
      { status: 500 }
    );
  }
}
