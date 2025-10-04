"use client";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Product } from "@/types/product.type";

export default function AccordionTabs({
  metafields,
}: {
  metafields: Product[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return (
    <div>
      {metafields &&
        metafields.map((item, i) => (
          <div key={i} className="mb-2">
            {/* Accordion Header */}
            <div
              className="flex items-center justify-between cursor-pointer border-b border-[#6C7275] pb-2"
              onClick={() => toggleAccordion(i)}
            >
              <h4 className="font-inter text-[18px] font-medium">
                {item?.title}
              </h4>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Accordion Content */}
            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight:
                  openIndex === i
                    ? `${contentRefs.current[i]?.scrollHeight}px`
                    : "0px",
                opacity: openIndex === i ? 1 : 0,
              }}
            >
              <div
                className="accordion font-inter text-[12px] text-[#141718] font-normal py-2"
                dangerouslySetInnerHTML={{ __html: item?.content }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
