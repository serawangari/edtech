import { TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

export default function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={clsx('w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600', props.className)} />;
}
