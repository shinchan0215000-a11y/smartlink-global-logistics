import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

interface QuotePayload {
  companyName: string;
  contactName: string;
  email: string;
  telephone: string;
  shipmentType: 'Import' | 'Export';
  origin: string;
  destination: string;
  modeOfTransport: 'Air' | 'Sea';
  packages: string;
  weightKg: string;
  measurementCubic: string;
  commodity: string;
  value: string;
  customsClearance: 'Required' | 'Not Required';
  specialInstructions: string;
}

function cleanText(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLen);
}

function cleanMultiline(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 160;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 18;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

function validateQuoteBody(body: Record<string, unknown>): {
  ok: true;
  data: QuotePayload;
} | {
  ok: false;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  const companyName = cleanText(body.companyName, 140);
  const contactName = cleanText(body.contactName, 120);
  const email = cleanText(body.email, 160);
  const telephone = cleanText(body.telephone, 40);
  const shipmentType = body.shipmentType === 'Export' ? 'Export' : body.shipmentType === 'Import' ? 'Import' : '';
  const origin = cleanText(body.origin, 140);
  const destination = cleanText(body.destination, 140);
  const modeOfTransport = body.modeOfTransport === 'Air' ? 'Air' : body.modeOfTransport === 'Sea' ? 'Sea' : '';
  const packages = cleanText(body.packages, 60);
  const weightKg = cleanText(body.weightKg, 60);
  const measurementCubic = cleanText(body.measurementCubic, 60);
  const commodity = cleanText(body.commodity, 200);
  const value = cleanText(body.value, 80);
  const customsClearance =
    body.customsClearance === 'Required'
      ? 'Required'
      : body.customsClearance === 'Not Required'
        ? 'Not Required'
        : '';
  const specialInstructions = cleanMultiline(body.specialInstructions, 1500);

  if (!companyName) errors.companyName = 'Company Name is required.';
  if (!contactName) errors.contactName = 'Contact Name is required.';
  if (!email || !isValidEmail(email)) errors.email = 'Valid Email address is required.';
  if (!telephone || !isValidPhone(telephone)) errors.telephone = 'Valid Telephone number is required.';
  if (!shipmentType) errors.shipmentType = 'Select Import or Export.';
  if (!origin) errors.origin = 'Origin is required.';
  if (!destination) errors.destination = 'Destination is required.';
  if (!modeOfTransport) errors.modeOfTransport = 'Select Air or Sea.';
  if (!packages) errors.packages = 'Packages count/type is required.';
  if (!weightKg) errors.weightKg = 'Weight (kg) is required.';
  if (!commodity) errors.commodity = 'Commodity description is required.';
  if (!customsClearance) errors.customsClearance = 'Select Customs Clearance preference.';

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      companyName,
      contactName,
      email,
      telephone,
      shipmentType: shipmentType as 'Import' | 'Export',
      origin,
      destination,
      modeOfTransport: modeOfTransport as 'Air' | 'Sea',
      packages,
      weightKg,
      measurementCubic,
      commodity,
      value,
      customsClearance: customsClearance as 'Required' | 'Not Required',
      specialInstructions,
    },
  };
}

function buildMailtoUrl(data: QuotePayload, referenceId: string): string {
  const subject = `[Quote Enquiry ${referenceId}] ${data.shipmentType} via ${data.modeOfTransport} - ${data.companyName}`;
  const lines = [
    `Reference ID: ${referenceId}`,
    `Company Name: ${data.companyName}`,
    `Contact Name: ${data.contactName}`,
    `Email: ${data.email}`,
    `Telephone: ${data.telephone}`,
    `Shipment Type: ${data.shipmentType}`,
    `Mode of Transport: ${data.modeOfTransport}`,
    `Origin: ${data.origin}`,
    `Destination: ${data.destination}`,
    `Packages: ${data.packages}`,
    `Weight (kg): ${data.weightKg}`,
    `Measurement (Cubic): ${data.measurementCubic || 'Not specified'}`,
    `Commodity: ${data.commodity}`,
    `Value: ${data.value || 'Not specified'}`,
    `Customs Clearance: ${data.customsClearance}`,
    `Special Instructions: ${data.specialInstructions || 'None'}`,
  ];
  return `mailto:info@smartlinkglobal.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      smtpConfigured: isSmtpConfigured(),
    });
  });

  app.post('/api/quote', async (req: Request, res: Response) => {
    try {
      const raw = typeof req.body === 'object' && req.body !== null ? (req.body as Record<string, unknown>) : {};
      const validation = validateQuoteBody(raw);

      if (!validation.ok) {
        res.status(400).json({
          ok: false,
          error: 'Please check the highlighted form fields.',
          errors: validation.errors,
        });
        return;
      }

      const data = validation.data;
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
      const referenceId = `SLG-${datePart}-${randomPart}`;
      const mailtoUrl = buildMailtoUrl(data, referenceId);

      if (!isSmtpConfigured()) {
        res.status(200).json({
          ok: true,
          emailed: false,
          referenceId,
          mailtoUrl,
          message:
            'Your enquiry inputs were validated, but automated SMTP email delivery is not configured in this environment. No email was sent automatically — please use "Send via Email Client", copy the summary, or call +91 98418 96000.',
        });
        return;
      }

      const port = Number(process.env.SMTP_PORT || 587);
      const secure = process.env.SMTP_SECURE === 'true' || port === 465;
      const recipient = process.env.QUOTE_RECIPIENT_EMAIL?.trim() || 'info@smartlinkglobal.in';

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST!.trim(),
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER!.trim(),
          pass: process.env.SMTP_PASS!.trim(),
        },
      });

      const rows: Array<[string, string]> = [
        ['Reference ID', referenceId],
        ['Company Name', data.companyName],
        ['Contact Name', data.contactName],
        ['Email', data.email],
        ['Telephone', data.telephone],
        ['Shipment Type', data.shipmentType],
        ['Mode of Transport', data.modeOfTransport],
        ['Origin', data.origin],
        ['Destination', data.destination],
        ['Packages', data.packages],
        ['Weight (kg)', data.weightKg],
        ['Measurement (Cubic)', data.measurementCubic || 'Not specified'],
        ['Commodity', data.commodity],
        ['Value', data.value || 'Not specified'],
        ['Customs Clearance', data.customsClearance],
        ['Special Instructions', data.specialInstructions || 'None'],
      ];

      const htmlRows = rows
        .map(
          ([label, val]) =>
            `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(val)}</td></tr>`,
        )
        .join('');

      await transporter.sendMail({
        from: process.env.SMTP_USER!.trim(),
        to: recipient,
        replyTo: data.email,
        subject: `[Quote Enquiry ${referenceId}] ${data.shipmentType} (${data.modeOfTransport}) - ${data.companyName}`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
        html: `<div style="font-family:sans-serif;max-width:680px;margin:0 auto;">
          <h2 style="color:#09111E;">SmartLink Global Logistics — New Quote Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">${htmlRows}</table>
        </div>`,
      });

      res.status(200).json({
        ok: true,
        emailed: true,
        referenceId,
        message: 'Your shipment quote enquiry has been dispatched to SmartLink Global Logistics.',
      });
    } catch (err) {
      console.error('Quote submission error:', err);
      res.status(500).json({
        ok: false,
        error: 'Unable to dispatch enquiry right now. Please contact +91 98418 96000 or info@smartlinkglobal.in.',
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SmartLink Global Logistics server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
