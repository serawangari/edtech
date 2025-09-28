import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={clsx('inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800', className)} {...props} />;
}
