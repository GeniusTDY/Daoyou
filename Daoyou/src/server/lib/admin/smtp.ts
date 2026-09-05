import nodemailer from 'nodemailer';

interface SmtpSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

function readSmtpConfig(): SmtpSettings | null {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.MAIL_FROM?.trim();

  if (!host || !Number.isInteger(port) || port <= 0 || !user || !pass || !from) {
    return null;
  }

  return { host, port, secure, user, pass, from };
}

/**
 *  SMTP
 *
 * / SMTP
 *
 */
export function isSmtpConfigured(): boolean {
  return readSmtpConfig() !== null;
}

export function createSmtpTransporter() {
  const settings = readSmtpConfig();
  if (!settings) {
    throw new Error(
      'SMTP is not configured: SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/MAIL_FROM',
    );
  }

  return {
    transporter: nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
      auth: { user: settings.user, pass: settings.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    }),
    from: settings.from,
  };
}

export async function sendViaSmtp(
  email: string,
  subject: string,
  content: string,
) {
  // / SMTP
  if (!isSmtpConfigured()) {
    console.warn(
      '[smtp] skip sending email because SMTP is not configured. ' +
        `to=${email} subject=${subject}`,
    );
    return;
  }

  const { transporter, from } = createSmtpTransporter();
  const html = content
    .split('\n')
    .map((line) => line.trim())
    .join('<br />');

  await transporter.sendMail({
    from,
    to: email,
    subject,
    text: content,
    html,
  });
}