"use client";
import Select from "react-select";

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
}

export default function MultiSelect({ label, options, value, onChange }: MultiSelectProps) {
  const formattedOptions = options.map((opt) => ({ label: opt, value: opt }));

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm">{label}</label>
      <Select
        isMulti
        options={formattedOptions}
        value={formattedOptions.filter((opt) => value.includes(opt.value))}
        onChange={(selected) => onChange(selected.map((item) => item.value))}
        className="text-black"
        classNames={{
          control: () =>
            "bg-transparent border border-gray-700 rounded-md text-white",
          multiValue: () => "bg-orange-500 text-black rounded-full px-2 py-[2px]",
          multiValueLabel: () => "text-sm font-medium",
          option: () => "text-black",
        }}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            borderColor: "#4B5563",
            color: "black",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#111",
            color: "black",
          }),
        }}
      />
    </div>
  );
}
