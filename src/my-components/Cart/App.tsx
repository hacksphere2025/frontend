import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  return (
    <>
      <Button variant="outline" size="icon">
        <ShoppingCart className="absolute h-[1.2rem] w-[1.2rem] " />
      </Button>
    </>
  )
}
