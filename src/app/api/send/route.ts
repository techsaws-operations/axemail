import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.to || !body.subject || (!body.text && !body.html) || !body.fromName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let response: Response;

    try {
      response = await fetch(
        `${process.env.AXEMAIL_SERVER_URL}/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.AXEMAIL_API_KEY as string,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        }
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "AbortError") {
        return NextResponse.json(
          { error: "Mail server timeout" },
          { status: 504 }
        );
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "Send failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Frontend send error:", err);
    return NextResponse.json(
      { error: "Internal API error" },
      { status: 500 }
    );
  }
}
