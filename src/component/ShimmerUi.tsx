// components/LoadingSkeleton.tsx
import React from "react";

 function ShimmerUi() {
  return (
    <div
      className="container mx-auto px-4 py-8 mt-14"
      aria-busy="true"
      aria-label="Loading content"
    >
     
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
         
          <div className="w-full sm:w-48 h-10 rounded-md bg-gray-200 animate-pulse" />

        
          <div className="w-full sm:w-32 h-10 rounded-md bg-gray-200 animate-pulse" />

         
          <div className="w-full sm:w-32 h-10 rounded-md bg-gray-200 animate-pulse" />

        
          <div className="w-full sm:w-24 h-10 rounded-md bg-gray-300 animate-pulse" />

        
          <div className="w-full sm:w-24 h-10 rounded-md bg-gray-200 animate-pulse" />
        </div>

        {/* small secondary row: a thin placeholder line (e.g. for breadcrumbs / info) */}
        <div className="mt-3 h-3 w-1/3 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Grid of 4 card skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <article
            key={i}
            className=" border-gray-300 border rounded-2xl p-4 shadow-sm bg-white h-auto "
            aria-hidden="true"
          >
            <div className=" flex flex-col items-center gap-4">
              {/* avatar */}
              <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />

              <div className="flex-1">
                {/* title */}
                <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse mb-3" />
                {/* subtitle */}
                <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse mb-4" />

                {/* tags / small lines */}
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-6 w-12 rounded-full bg-gray-200 animate-pulse" />
                </div>

                {/* price + button row */}
                <div className="flex items-center justify-between">
                  <div className="h-6 w-20 rounded bg-gray-200 animate-pulse" />
                  <div className="h-9 w-24 rounded-md bg-gray-300 animate-pulse" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* pagination skeleton */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="h-8 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="h-8 w-32 rounded bg-gray-200 animate-pulse" />
        <div className="h-8 w-20 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

export default ShimmerUi;
