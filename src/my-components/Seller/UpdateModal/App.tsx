import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product/Product";
import { Category } from "@/types/Product/Category";
import { api } from "@/api/App";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

type UpdateProductDialogProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
};

export default function UpdateProductDialog({
  modalState,
  setModalState,
  product,
  onUpdate,
}: UpdateProductDialogProps) {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");
        if (response.status == 200) {
          setCategories([...response.data.data]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const handleChange = (field: keyof Product, value: string | number) => {
    setUpdatedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(updatedProduct);
    onUpdate(updatedProduct);
    setModalState(false);
  };

  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Modify the product details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={updatedProduct.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((ele) => (
                  <SelectValue>{ele.name}</SelectValue>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={updatedProduct.quantity}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              value={updatedProduct.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="freshness">Freshness (1-10)</Label>
            <Input
              id="freshness"
              type="number"
              value={updatedProduct.freshness}
              onChange={(e) =>
                handleChange("freshness", Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label htmlFor="harvest_date">Harvest Date</Label>
            <Input
              id="harvest_date"
              type="date"
              //value={updatedProduct.harvest_date}
              onChange={(e) => handleChange("harvest_date", e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setModalState(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
