import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;

function isValidTwilioRequest(req: NextRequest): boolean {
  const signature = req.headers.get('x-twilio-signature');
  const url = `${req.nextUrl.origin}/api/webhooks/twilio`;
  const params = Object.fromEntries(req.clone().formData());

  if (!signature) return false;

  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}${params[key]}`)
    .join('');

  const expected = crypto
    .createHmac('sha1', TWILIO_AUTH_TOKEN)
    .update(Buffer.from(url + sortedParams))
    .digest('base64');

  return signature === expected;
}

export async function POST(req: NextRequest) {
  if (!isValidTwilioRequest(req)) {
    return new Response('Invalid Twilio Signature', { status: 403 });
  }

  const formData = await req.formData();
  const from = formData.get('From') as string;
  const body = formData.get('Body') as string;
  const mediaUrl = formData.get('MediaUrl0') as string | null;
  const channel = from.includes('whatsapp') ? 'WHATSAPP' : 'SMS';

  const phone = from.replace('whatsapp:', '').trim();

  // Find or create contact
  let contact = await prisma.contact.findUnique({ where: { phone } });
  if (!contact) {
    contact = await prisma.contact.create({
      data: {
        phone,
        channel: channel as 'SMS' | 'WHATSAPP',
        userId: 'system', // TODO: assign to team
      },
    });
  }

  // Save message
  await prisma.message.create({
    data: {
      body: body || '(media)',
      mediaUrl,
      direction: 'INBOUND',
      channel: channel as 'SMS' | 'WHATSAPP',
      contactId: contact.id,
      userId: 'system',
      status: 'DELIVERED',
      deliveredAt: new Date(),
    },
  });

  // Update contact unread
  await prisma.contact.update({
    where: { id: contact.id },
    data: { unreadCount: { increment: 1 }, lastMessage: new Date() },
  });

  return new Response('OK', { status: 200 });
}