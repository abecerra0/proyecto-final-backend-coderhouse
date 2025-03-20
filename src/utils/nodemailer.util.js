import { createTransport } from "nodemailer";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env;

async function nodemailer(to) {
  try {
    const user = GOOGLE_EMAIL;
    const pass = GOOGLE_PASSWORD;
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `COMMERCE <${user}>`,
      to,
      subject: "VERIFY YOUR CODER COMMERCE ACCOUNT",
      html: `YOUR VERIFY TOKEN IS: 123`,
    });
  } catch (error) {
    throw error;
  }
}

export default nodemailer;
