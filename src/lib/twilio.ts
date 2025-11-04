import Twilio from 'twilio';

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export const sendMessage = async (
  to: string,
  body: string,
  mediaUrl?: string,
  channel: 'SMS' | 'WHATSAPP' = 'SMS'
) => {
  const from = channel === 'WHATSAPP'
    ? `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`
    : process.env.TWILIO_PHONE_NUMBER;

  const toFormatted = channel === 'WHATSAPP' ? `whatsapp:${to}` : to;

  return client.messages.create({
    from,
    to: toFormatted,
    body,
    ...(mediaUrl && { mediaUrl: [mediaUrl] }),
  });
};