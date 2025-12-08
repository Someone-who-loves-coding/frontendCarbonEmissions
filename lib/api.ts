import {SectorResponse} from "@/types/emissions";

const BASE_URL = "https://backendcarbonemissions.onrender.com/api/emissions";

export async function fetchTrend(countryCode: string, gas: string, fromYear: number, toYear: number) {
    const res = await fetch(
        `${BASE_URL}/trend?countryCode=${countryCode}&gas=${gas}&fromYear=${fromYear}&toYear=${toYear}`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch trend");
    return res.json();
}

export async function fetchSector(): Promise<SectorResponse> {
    const baseUrl = "https://backendcarbonemissions.onrender.com/api/emissions/by-sector";

    // Fetch page 0 first
    const res0 = await fetch(`${baseUrl}?page=0&size=20&sort=emissions,desc`);
    if (!res0.ok) throw new Error("Failed to fetch sector data");
    const firstPage: SectorResponse = await res0.json();

    const total = firstPage.pagination.totalElements;
    const size = firstPage.pagination.size;
    const pages = Math.ceil(total / size);

    const sectors = [...firstPage.sectors];

    // Auto-fetch remaining pages if present
    const requests: Promise<Response>[] = [];
    for (let p = 1; p < pages; p++) {
        requests.push(fetch(`${baseUrl}?page=${p}&size=${size}&sort=emissions,desc`));
    }

    if (requests.length > 0) {
        const responses = await Promise.all(requests);
        const pageDataList = await Promise.all(responses.map(r => r.json()));

        pageDataList.forEach(pd => {
            if (pd.sectors) sectors.push(...pd.sectors);
        });
    }

    console.log(`Fetched ${sectors.length} sectors (expected ${total})`);

    // Return full merged data with pagination unchanged
    return {
        ...firstPage,
        sectors,
    };
}


export async function fetchTable(
    country: string,
    gas: string,
    year: number,
    page: number,
    size: number
) {
    const url = `${BASE_URL}/table?countryCode=${country}&gas=${gas}&year=${year}&page=${page}&size=${size}&sortField=emissions&sortDir=desc`;
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed table fetch");
    return res.json();
}
