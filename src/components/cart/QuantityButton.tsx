import { Variant } from "@/types/variant.type";
import { Minus, Plus } from "lucide-react";

export default function QuantityButton({
  item,
  qty,
  handleQuantityChange,
  hidden,
}: {
  item: Variant;
  qty: number;
  handleQuantityChange: (id: string, qty: number) => void;
  hidden?: boolean;
}) {
  return (
    <>
      <div
        className={`items-center justify-between border w-[80px] border-[#6C7275] rounded-md p-2 ${
          hidden ? "hidden" : "flex"
        }`}
      >
        <button
          className="cursor-pointer"
          onClick={() => handleQuantityChange(item._id, qty - 1)}
        >
          <Minus color="#121212" width={16} height={16} />
        </button>
        <span className="text-[12px] text-[#121212] font-semibold">{qty}</span>
        <button
          className="cursor-pointer"
          onClick={() => handleQuantityChange(item._id, qty + 1)}
        >
          <Plus color="#121212" width={16} height={16} />
        </button>
      </div>
    </>
  );
}
