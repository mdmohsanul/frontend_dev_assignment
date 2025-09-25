import Select from "react-select";

interface WorkerFiltersProps {
  servicesList?: string[];
  service?: string;
  setService: (s: string | undefined) => void;
  minPrice?: number;
  setMinPrice: (n: number | undefined) => void;
  maxPrice?: number;
  setMaxPrice: (n: number | undefined) => void;
  onApply: () => void;
}

export default function WorkerFilters({
  servicesList,
  service,
  setService,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
}: WorkerFiltersProps) {
  const options = [
    { label: "All Services", value: "" },
    ...(servicesList ?? []).map((s) => ({ label: s, value: s })),
  ];

  const handleReset = () => {
    setService(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onApply(); // optional: re-fetch data with cleared filters
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <Select
        options={options}
        value={
          servicesList?.find((s) => s === service)
            ? { label: service, value: service }
            : null
        }
        onChange={(option) => setService(option?.value)}
        placeholder="Select Service"
        className="md:w-full lg:w-48"
      />

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice ?? ""}
        onChange={(e) =>
          setMinPrice(e.target.value ? Number(e.target.value) : undefined)
        }
        className="border px-2 py-1 rounded"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice ?? ""}
        onChange={(e) =>
          setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
        }
        className="border px-2 py-1 rounded sm:w-44"
      />

      <button
        onClick={onApply}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Apply
      </button>

      <button
        onClick={handleReset}
        className="bg-gray-300 text-black px-4 rounded"
      >
        Reset
      </button>
    </div>
  );
}
