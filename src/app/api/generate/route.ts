import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy",
});

export async function POST(req: Request) {
  try {
    const { keyword, tone } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "dummy") {
      // Mock generation if missing API key for aesthetic demo
      await new Promise(res => setTimeout(res, 2500));
      return NextResponse.json({
        content: `# Comprehensive Guide to ${keyword}\n\n## Introduction\nWelcome to this comprehensive overview exploring the fascinating intersection of AI and content creation.\n\n## Why ${keyword} Works\nThis strategy is proven to yield 10X results. It effectively merges automated intelligence with targeted long-tail intent.\n\n### Key Benefits:\n- **Increased Traffic:** Better SEO rankings.\n- **Saved Time:** AI scales quickly.\n- **Dynamic Output:** Always aligned with *${tone}* tone!\n\n## Conclusion\nBy focusing strictly on ${keyword}, you ensure sustainable organic traffic over the long run.`,
      });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert SEO content strategist and writer. Generate a highly optimized blog post for the primary keyword provided. Use markdown, proper heading structure (H1, H2, H3), lists, and keep the tone ${tone}.`,
        },
        { role: "user", content: `Write a 600-word blog post about: ${keyword}` },
      ],
      model: "gpt-4",
    });

    return NextResponse.json({ content: completion.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
