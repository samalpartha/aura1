import type { NextApiRequest, NextApiResponse } from "next";

const backendUrl = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { repoUrl, branch } = req.body ?? {};
  if (!repoUrl) {
    return res.status(400).json({ error: "repoUrl is required" });
  }

  try {
    const response = await fetch(`${backendUrl}/analysis/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl, branch })
    });

    const text = await response.text();
    const parsed = safeParse(text);

    if (!response.ok) {
      const message = typeof parsed === "object" && parsed && "error" in parsed
        ? (parsed as any).error
        : "Failed to contact analysis service";
      return res.status(response.status).json({ error: message });
    }

    return res.status(200).json(parsed ?? {});
  } catch (err: any) {
    console.error("[api/analysis/run]", err);
    return res.status(500).json({ error: "Unable to reach backend service" });
  }
}

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
