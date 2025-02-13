import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/provider/userProvider/App";

export default function CartDropdown() {
  const { cart, setCart, removeElementCart } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2">
        <DropdownMenuLabel className="text-lg font-semibold">
          Your Cart
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {Array.from(cart.entries()).map(([key, item]) => (
          <Card key={key} className="flex gap-3 items-center border-0 p-3">
            <div className="h-12 w-12 bg-muted rounded-lg" />
            <CardContent className="p-0 flex-1 space-y-1 shadow-none">
              <p className="text-sm font-medium">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.product.seller_id.name}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const value = item.quantity;
                    if (value - 100 <= 0) {
                      removeElementCart(key);
                      return;
                    }
                    setCart(key, {
                      product: item.product,
                      quantity: value - 100,
                    });
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">
                  {item.quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const value = item.quantity;
                    setCart(key, {
                      product: item.product,
                      quantity: value + 100,
                    });
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button className="w-full">Checkout</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
