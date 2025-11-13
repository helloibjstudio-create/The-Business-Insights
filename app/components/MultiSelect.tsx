"use client";
import Select from "react-select";

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
}: MultiSelectProps) {
  const formattedOptions = options.map((opt) => ({ label: opt, value: opt }));

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-300 tracking-wide">
        {label}
      </label>
      <Select
        isMulti
        options={formattedOptions}
        value={formattedOptions.filter((opt) => value.includes(opt.value))}
        onChange={(selected) => onChange(selected.map((item) => item.value))}
        className="text-white"
        classNames={{
          control: () =>
            "bg-gray-900/60 border border-gray-700 hover:border-orange-500 transition-all duration-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
          multiValue: () =>
            "bg-orange-500/90 text-black rounded-full px-2 py-[2px] shadow-sm",
          multiValueLabel: () => "text-xs font-semibold",
          option: () =>
            "text-gray-100 hover:bg-orange-500/80 hover:text-black transition-colors duration-150 cursor-pointer",
        }}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            borderColor: "#374151",
            boxShadow: "none",
            minHeight: "42px",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1F2937",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "black",
            ":hover": {
              backgroundColor: "#dc2626",
              color: "white",
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#f97316",
            primary25: "#fb923c30",
            neutral0: "transparent",
          },
        })}
      />
    </div>
  );
}
