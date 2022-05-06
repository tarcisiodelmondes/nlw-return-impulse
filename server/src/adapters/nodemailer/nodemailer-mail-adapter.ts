import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6f98bb3df3d00e",
    pass: "ffbb715085222b",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com.br>",
      to: "Tarcisio Delmondes <tarcisiodelmondes@gmail.com>",
      subject,
      html: body,
    });
  }
}
