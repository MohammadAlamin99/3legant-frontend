export default function Variants({ option }: { option?: object }) {
  return (
    <div>
      {option && Object.keys(option).length > 0 && (
        <p className="text-xs text-[#6C7275] font-inter mb-2">
          {Object.entries(option)
            .map(([key, value]) => `${key}: ${value}`)
            .join(" | ")}
        </p>
      )}
    </div>
  );
}
