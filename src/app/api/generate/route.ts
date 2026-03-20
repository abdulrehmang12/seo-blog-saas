import { NextResponse } from "next/server";
import OpenAI from "openai";

const VALID_TONES = ["Professional", "Conversational", "Persuasive", "Humorous"] as const;
type Tone = typeof VALID_TONES[number];

function sanitizeInput(input: string): string {
  return input.replace(/[`\n\r]/g, " ").trim().substring(0, 200);
}

const MOCK_TEMPLATES: Record<Tone, (keyword: string) => string> = {
  Professional: (keyword) =>
    `# Comprehensive Guide to ${keyword}\n\n## Introduction\nThis guide provides an authoritative overview of ${keyword} and its strategic significance in modern digital marketing.\n\n## Why ${keyword} Matters\nOrganizations leveraging ${keyword} consistently outperform competitors in organic search rankings.\n\n### Key Benefits:\n- **Increased Traffic:** Improved SEO rankings drive qualified visitors.\n- **Saved Time:** Systematic approaches scale efficiently.\n- **Measurable ROI:** Data-driven results aligned with business objectives.\n\n## Conclusion\nBy implementing a structured ${keyword} strategy, you ensure sustainable organic growth over the long term.`,

  Conversational: (keyword) =>
    `# Let's Talk About ${keyword}\n\n## Hey, Have You Heard About This?\nSo, you're curious about ${keyword}? Great choice — it's one of those topics that can genuinely change how you approach your online presence.\n\n## Why You'll Love ${keyword}\nHonestly, once you get the hang of it, ${keyword} becomes second nature.\n\n### Here's What You'll Get:\n- **More Visitors:** Your site starts showing up where it matters.\n- **Less Stress:** Automation handles the heavy lifting.\n- **Real Results:** People actually engage with your content.\n\n## Wrapping Up\nGive ${keyword} a shot — you'll wonder how you ever managed without it.`,

  Persuasive: (keyword) =>
    `# Why ${keyword} Is Non-Negotiable for Your Success\n\n## The Opportunity You Can't Afford to Miss\nEvery day without a ${keyword} strategy is a day your competitors pull further ahead. The evidence is overwhelming.\n\n## The Case for ${keyword}\nBusinesses that commit to ${keyword} see transformative results — higher rankings, more leads, greater revenue.\n\n### Compelling Reasons to Act Now:\n- **Competitive Edge:** Dominate your niche before others do.\n- **Scalable Growth:** Build an asset that compounds over time.\n- **Proven Results:** Thousands of brands have already succeeded.\n\n## Take Action Today\nDon't wait. Implement ${keyword} now and secure your position at the top.`,

  Humorous: (keyword) =>
    `# The Surprisingly Hilarious Truth About ${keyword}\n\n## Plot Twist: This Actually Matters\nYou clicked on an article about ${keyword}. Either you're very dedicated or you lost a bet. Either way, welcome!\n\n## Why ${keyword} Is Low-Key Amazing\nLook, nobody wakes up thinking "I can't wait to learn about ${keyword}" — and yet here we are, and honestly? It's pretty great.\n\n### Things ${keyword} Will Do For You:\n- **Traffic:** Your site goes from ghost town to bustling metropolis.\n- **Time Savings:** More time for coffee. You're welcome.\n- **Bragging Rights:** Drop "${keyword}" in meetings and watch heads nod.\n\n## The Moral of the Story\n${keyword} is the underrated hero you didn't know you needed. Give it a chance — it won't let you down.`,
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy",
});

export async function POST(req: Request) {
  try {
    const { keyword: rawKeyword, tone: rawTone } = await req.json();

    if (typeof rawKeyword !== "string" || typeof rawTone !== "string") {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    const keyword = sanitizeInput(rawKeyword);
    const tone = sanitizeInput(rawTone);

    if (!keyword || keyword.length < 2) {
      return NextResponse.json({ error: "A valid keyword is required" }, { status: 400 });
    }

    if (!VALID_TONES.includes(tone as Tone)) {
      return NextResponse.json({ error: "Invalid tone value" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "dummy") {
      // Mock generation if missing API key for aesthetic demo
      await new Promise(res => setTimeout(res, 2500));
      return NextResponse.json({
        content: MOCK_TEMPLATES[tone as Tone](keyword),
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
