import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Instantiate inside the handler — not at module level
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Trident Website <hello@trident.ky>",
      to: "ethan@trident.ky",
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A2342;">New Trident Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background: #F7F8FA; padding: 16px; border-radius: 8px;">${message}</p>
          <hr style="border: none; border-top: 1px solid #E8EAED; margin: 24px 0;" />
          <p style="color: #8896A7; font-size: 12px;">Sent via trident.ky contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
