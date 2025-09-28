import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold"><Leaf className="h-5 w-5" /> Leafscapes</div>
          <p className="mt-3 text-gray-600">EdTech for climate action. Built in Kenya, for the world.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="font-medium">Product</div>
            <a href="#features" className="block hover:underline">Features</a>
            <a href="#audiences" className="block hover:underline">Who it's for</a>
            <a href="#impact" className="block hover:underline">Impact</a>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Company</div>
            <a className="block hover:underline">About</a>
            <a className="block hover:underline">Privacy</a>
            <a className="block hover:underline">Terms</a>
          </div>
        </div>
        <div className="md:text-right">
          <div className="font-medium">Contact</div>
          <div className="text-gray-600">info@leafscapes.africa</div>
          <div className="text-gray-600">Nairobi • Kenya</div>
        </div>
      </div>
    </footer>
  );
}
