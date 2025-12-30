import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url, rootUrl: sentRootUrl } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL ارسال نشده" }, { status: 400 });
    }

    const rootUrl = sentRootUrl || new URL(url).origin;

    console.log("Fetching URL:", url);

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const crawlDate = new Date().toISOString();
    const images: { src: string; alt: string }[] = [];

    $("img").each((_, el) => {
      let src = $(el).attr("src") || $(el).attr("data-src") || "";

      if (src) {
        // اگر لینک با .. شروع شده
        if (src.startsWith("..")) {
          src = src.replace(/^..\/?/, rootUrl + "/");
        }
        // اگر لینک با IMG/ شروع شده
        else if (src.startsWith("IMG/")) {
          src = rootUrl + "/" + src;
        }

        images.push({ src, alt: $(el).attr("alt") || "" });
      }
    });

    let xml = `\n`;
   
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${crawlDate}</lastmod>\n`;
    xml += `    <priority>0.8</priority>\n`;

    images.forEach(img => {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${img.src}</image:loc>\n`;
      if (img.alt) xml += `      <image:caption>${img.alt}</image:caption>\n`;
      xml += `    </image:image>\n`;
    });

    xml += `  </url>\n`;

    return NextResponse.json({ xml });

  } catch (err: any) {
    console.error("Crawl error:", err);
    return NextResponse.json({ error: err.message || "خطای ناشناخته" }, { status: 500 });
  }
}





