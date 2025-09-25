import { NextRequest, NextResponse } from "next/server";
import workersData from "../../../../workers.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "workers", "services", or "stats"

    const servicesList = Array.from(
      new Set(
        workersData
          .map((worker) => worker.service)
          .filter((s) => s && s.trim() !== "") // remove empty/invalid services
      )
    ).sort(); // optional: sort alphabetically


    // -----------------------------
    // 1️⃣ WORKERS (with filters + pagination)
    // -----------------------------
    if (type === "workers") {
      let filteredWorkers = [...workersData];

      // Filters
      const minPrice = Number(searchParams.get("minPrice")) || 0;
      const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
      const service = searchParams.get("service");

      filteredWorkers = filteredWorkers.filter((worker) => {
        const priceOk =
          worker.pricePerDay >= minPrice && worker.pricePerDay <= maxPrice;
        const serviceOk = service ? worker.service === service : true;
        return priceOk && serviceOk;
      });

      // Pagination
      const page = Number(searchParams.get("page")) || 1;
      const limit = Number(searchParams.get("limit")) || 10;
      const startIndex = (page - 1) * limit;
      const paginatedWorkers = filteredWorkers.slice(
        startIndex,
        startIndex + limit
      );

      return NextResponse.json(
        {
          success: true,
          data: paginatedWorkers,
          metadata: {
            servicesList,
            total: filteredWorkers.length,
            page,
            limit,
            totalPages: Math.ceil(filteredWorkers.length / limit),
          },
          timestamp: new Date().toISOString(),
        },
        {
          status: 200,
          headers: { "Cache-Control": "public, max-age=300" },
        }
      );
    }

    // -----------------------------
    // 2️⃣ SERVICES (just names)
    // -----------------------------
    const services = Array.from(
      new Set(workersData.map((worker) => worker.service))
    );
    if (type === "services") {
      return NextResponse.json(
        {
          success: true,
          data: services,
          metadata: { count: services.length, servicesList },
          timestamp: new Date().toISOString(),
        },
        {
          status: 200,
          headers: { "Cache-Control": "public, max-age=300" },
        }
      );
    }

    // -----------------------------
    // 3️⃣ SERVICE STATS (default)
    // -----------------------------
    const serviceStats = services
      .map((service) => {
        const workersInService = workersData.filter(
          (worker) => worker.service === service
        );
        const avgPrice = Math.round(
          workersInService.reduce(
            (sum, worker) => sum + worker.pricePerDay,
            0
          ) / workersInService.length
        );
        const minPrice = Math.min(
          ...workersInService.map((w) => w.pricePerDay)
        );
        const maxPrice = Math.max(
          ...workersInService.map((w) => w.pricePerDay)
        );

        return {
          name: service,
          count: workersInService.length,
          averagePrice: avgPrice,
          priceRange: { min: minPrice, max: maxPrice },
        };
      })
      .sort((a, b) => b.count - a.count);

    return NextResponse.json(
      {
        success: true,
        data: serviceStats,
        metadata: {
          totalServices: services.length,
          totalWorkers: workersData.length,
          servicesList,
        },
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: { "Cache-Control": "public, max-age=300" },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "Failed to fetch data",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
