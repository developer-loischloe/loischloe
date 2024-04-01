import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

const PaymentInformation = ({ disabled }: { disabled: boolean }) => {
  return (
    <div className="flex-1 space-y-5">
      <div>
        <h5 className="text-lg mb-2">Choose Payment Method</h5>
        <RadioGroup defaultValue="cash-on-delivery">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
            <Label htmlFor="cash-on-delivery">Cash on delivery</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" disabled={disabled}>
        Place Order
      </Button>
    </div>
  );
};

export default PaymentInformation;
