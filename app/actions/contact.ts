'use server';

import { ContactSchema } from '@/lib/validation';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function submitContact(formData: FormData) {
  const payload = Object.fromEntries(formData) as Record<string,string>;
  const parsed = ContactSchema.safeParse({
    name: payload.name,
    email: payload.email,
    org: payload.org,
    message: payload.message,
    audience: payload.audience
  });
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  // 1) store lead
  const { error } = await supabase.from('leads').insert({
    name: data.name,
    email: data.email,
    organization: data.org,
    audience: data.audience,
    message: data.message
  });
  if (error) {
    return { ok: false, errors: { _server: [error.message] } };
  }

  // 2) email notify
  if (process.env.CONTACT_INBOX) {
    await resend.emails.send({
      from: 'Leafscapes <noreply@leafscapes.africa>',
      to: [process.env.CONTACT_INBOX],
      subject: `New ${data.audience} lead: ${data.name}`,
      text: `${data.name} (${data.email}) from ${data.org}\n\n${data.message}`
    });
  }

  return { ok: true };
}
