'use client'
import { useState } from "react";
import { useWorkers } from "@/hooks/useQuery";
import WorkerGrid from "@/component/WorkersGrid";
import WorkerFilters from "@/component/WorkersFilter";
import Pagination from "@/component/Pagination";
import ShimmerUi from "@/component/ShimmerUi";

export default function WorkersPage() {
  const [page, setPage] = useState(1);
  const [service, setService] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const { data, isLoading, isError, isPlaceholderData } = useWorkers({
    page,
    limit: 12,
    service,
    minPrice,
    maxPrice,
  });

  if (isLoading) return <ShimmerUi />;
  if (isError) return <p>Error fetching workers</p>;
  if (!data) return <div>No data available.</div>;

  return (
    <main className="container mx-auto px-4 py-8 mt-14">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Workers</h1>

      <WorkerFilters
        servicesList={data.metadata.servicesList}
        service={service}
        setService={setService}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onApply={() => setPage(1)}
      />

      <WorkerGrid workers={data.data} />

      <Pagination
        page={page}
        totalPages={data.metadata.totalPages}
        setPage={setPage}
      />
    </main>
  );
}
