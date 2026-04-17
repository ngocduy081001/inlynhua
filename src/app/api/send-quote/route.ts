import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, business, plan, quantity, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Tên và số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "phamtranngocduy@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "InLyGiaRe <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `[Báo Giá] ${name} - Gói ${plan || "Chưa chọn"}`,
      html: `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#f4f2eb;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2eb;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 30px rgba(0,0,0,0.08);">
                  <!-- Header -->
                  <tr>
                    <td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
                      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#6d8869;margin-bottom:8px;">IN LY GIÁ RẺ</p>
                      <h1 style="margin:0;font-size:28px;font-weight:900;color:#f8eb96;letter-spacing:-1px;">Yêu Cầu Báo Giá Mới</h1>
                      <p style="margin:12px 0 0;font-size:13px;color:#ffffff80;">Nhận lúc ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</p>
                    </td>
                  </tr>
                  
                  <!-- Plan badge -->
                  ${plan ? `
                  <tr>
                    <td style="background:#f8eb96;padding:20px 40px;text-align:center;">
                      <span style="display:inline-block;background:#1a1a1a;color:#f8eb96;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:8px 24px;border-radius:100px;">
                        Gói đã chọn: ${plan}
                      </span>
                    </td>
                  </tr>
                  ` : ""}
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="margin:0 0 24px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6d8869;">Thông Tin Khách Hàng</h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #f4f2eb;">
                            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Họ tên</span><br/>
                            <span style="font-size:16px;font-weight:600;color:#1a1a1a;margin-top:4px;display:block;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #f4f2eb;">
                            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Số điện thoại</span><br/>
                            <span style="font-size:16px;font-weight:600;color:#1a1a1a;margin-top:4px;display:block;">${phone}</span>
                          </td>
                        </tr>
                        ${email ? `
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #f4f2eb;">
                            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Email</span><br/>
                            <span style="font-size:16px;font-weight:600;color:#1a1a1a;margin-top:4px;display:block;">${email}</span>
                          </td>
                        </tr>
                        ` : ""}
                        ${business ? `
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #f4f2eb;">
                            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Tên quán / Thương hiệu</span><br/>
                            <span style="font-size:16px;font-weight:600;color:#1a1a1a;margin-top:4px;display:block;">${business}</span>
                          </td>
                        </tr>
                        ` : ""}
                        ${quantity ? `
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #f4f2eb;">
                            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Số lượng dự kiến</span><br/>
                            <span style="font-size:16px;font-weight:600;color:#1a1a1a;margin-top:4px;display:block;">${quantity}</span>
                          </td>
                        </tr>
                        ` : ""}
                        ${message ? `
                        <tr>
                          <td style="padding:12px 0;">
                            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Ghi chú thêm</span><br/>
                            <span style="font-size:15px;color:#374151;margin-top:8px;display:block;line-height:1.6;background:#f4f2eb;padding:16px;border-radius:8px;border-left:3px solid #6d8869;">${message}</span>
                          </td>
                        </tr>
                        ` : ""}
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background:#1a1a1a;padding:24px 40px;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#ffffff60;">© ${new Date().getFullYear()} In Ly Giá Rẻ · Email được tạo tự động từ website</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Có lỗi xảy ra, vui lòng thử lại." },
      { status: 500 }
    );
  }
}
