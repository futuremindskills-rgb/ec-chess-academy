import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pdfUrl = searchParams.get("url");

  if (!pdfUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(pdfUrl, {
      redirect: "follow",
      cache: "no-store",
    });

    console.log(`[PDF Proxy] URL: ${pdfUrl}`);
    console.log(`[PDF Proxy] Status: ${response.status}`);
    console.log(`[PDF Proxy] Content-Type: ${response.headers.get("content-type")}`);

    if (!response.ok) {
      console.error(`[PDF Proxy] Fetch failed with status ${response.status}`);
      return new NextResponse(`PDF fetch failed: ${response.status} ${response.statusText}`, {
        status: response.status,
      });
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600",
        // Allow embedding in iframes from same origin
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch (error: any) {
    console.error("[PDF Proxy] Exception:", error?.message || error);
    return new NextResponse(`Proxy error: ${error?.message}`, { status: 500 });
  }
}
