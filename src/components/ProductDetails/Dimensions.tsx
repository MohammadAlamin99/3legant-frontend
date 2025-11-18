import React from "react";

export default function Dimensions({
  dimensions,
}: {
  dimensions: { l?: number; w?: number; h?: number } | undefined;
}) {
  return (
    <div>
      {(dimensions?.l || dimensions?.w || dimensions?.h) && (
        <>
          <h3 className="text-[16px] font-semibold text-[#6C7275] mb-2">
            Dimensions
          </h3>
          <p className="text-black font-normal font-inter text-[20px]">
            L : {dimensions?.l ?? "-"} x W : {dimensions?.w ?? "-"} x H :{" "}
            {dimensions?.h ?? "-"}
          </p>
        </>
      )}
    </div>
  );
}
