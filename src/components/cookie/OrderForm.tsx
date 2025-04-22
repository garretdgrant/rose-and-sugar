import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export type FormData = {
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  notes: string;
  designs: {
    id: string;
    name: string;
    quantity: number;
  }[];
};

interface OrderFormProps {
  selectedDesigns: {
    id: string;
    name: string;
    quantity: number;
  }[];
  onSubmit: (formData: FormData) => void;
}

const OrderForm = ({ selectedDesigns, onSubmit }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      designs: selectedDesigns,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalSets = selectedDesigns.reduce(
    (sum, design) => sum + design.quantity,
    0,
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {selectedDesigns.length > 0 && (
        <div className="bg-accent/20 p-4 rounded-lg mb-6">
          <h4 className="font-medium mb-2">Selected Designs:</h4>
          <ul className="space-y-2">
            {selectedDesigns.map(
              (design) =>
                design.quantity > 0 && (
                  <li key={design.id} className="flex justify-between">
                    <span>{design.name}</span>
                    <span>{design.quantity} sets</span>
                  </li>
                ),
            )}
          </ul>
          <div className="mt-4 pt-4 border-t border-accent">
            <div className="flex justify-between font-medium">
              <span>Total Sets:</span>
              <span>{totalSets}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="pickupDate">Preferred Pickup Date</Label>
          <Input
            id="pickupDate"
            name="pickupDate"
            type="date"
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Special Instructions (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requests or notes for your order..."
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={totalSets === 0}
        >
          Submit Order
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
