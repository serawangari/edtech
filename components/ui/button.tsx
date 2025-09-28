import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
};

export default function Button({ className, variant='default', size='md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants: Record<string,string> = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-900',
    secondary: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
    ghost: 'hover:bg-gray-100'
  };
  const sizes: Record<string,string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4',
    lg: 'h-12 px-6 text-lg'
  };
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}
