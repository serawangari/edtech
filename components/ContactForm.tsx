'use client';
import { useState, useTransition } from 'react';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { submitContact } from '@/app/actions/contact';

export default function ContactForm() {
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const [ok, setOk] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    startTransition(async () => {
      const res = await submitContact(fd);
      if (!res?.ok) { setServerErrors(res?.errors ?? {}); return; }
      setOk(true); (e.target as HTMLFormElement).reset(); setServerErrors({});
    });
  };

  return (
    <section id="contact" className="py-20 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">Book a demo</h2>
          <p className="mt-3 text-gray-600">Tell us about your rollout and we’ll tailor a plan.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Input placeholder="Your name" name="name" required />
              </div>
              <div>
                <Input placeholder="Email" name="email" type="email" required />
              </div>
            </div>
            <Input placeholder="School / Organization" name="org" required />
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <label className="inline-flex items-center gap-2"><input type="radio" name="audience" value="school" defaultChecked /> School</label>
              <label className="inline-flex items-center gap-2"><input type="radio" name="audience" value="corporate" /> Corporate</label>
              <label className="inline-flex items-center gap-2"><input type="radio" name="audience" value="ngo" /> NGO</label>
            </div>
            <Textarea placeholder="What problem are you solving?" name="message" rows={5} required />
            {Object.keys(serverErrors).length > 0 && (<p className="text-xs text-red-600">Please fix the highlighted fields.</p>)}
            <Button type="submit" className="w-full" disabled={pending}>{pending ? 'Sending…' : 'Send'}</Button>
            {ok && <p className="text-sm text-emerald-700">Thanks! We’ll be in touch soon.</p>}
          </form>
        </div>
        <div>
          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Why teams pick Leafscapes</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>School-safe authentication and role-based access.</li>
              <li>KPI dashboards aligned to CSR and ESG reporting.</li>
              <li>Delightful UX with gamified challenges that drive action.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
