import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parentName, studentName, email, phone, location, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'EC Chess <onboarding@resend.dev>', // Change to your verified domain later
      to: ['enquiry.ecchess@gmail.com'],
      subject: `New Enquiry: ${parentName} (${location})`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4F46E5;">New Chess Academy Enquiry</h2>
          <p><strong>Parent Name:</strong> ${parentName}</p>
          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Preferred Location:</strong> ${location}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4F46E5;">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}