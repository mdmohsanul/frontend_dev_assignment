import WorkerCard from "@/component/WorkerCard";
import { WorkerType } from "@/types/workers";

interface WorkerGridProps {
  workers: WorkerType[];
}

export default function WorkerGrid({ workers }: WorkerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-8">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
}
