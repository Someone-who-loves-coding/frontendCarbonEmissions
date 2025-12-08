export interface TrendPoint {
    year: number;
    value: number;
}

export interface TrendResponse {
    points: TrendPoint[];
    unit: string;
    countryCode: string;
    gas: string;
    fromYear: number;
    toYear: number;
}

export interface PaginationInfo {
    totalPages: number;
    sortDir: string;
    size: number;
    sortField: string;
    totalElements: number;
    page: number;
}

export interface SectorItem {
    sector: string;
    emissions: number;
    share: number;
}

export interface SectorResponse {
    sectors: SectorItem[];
    unit: string;
    year: number;
    gas: string;
    countryCode: string;
    globalTotalMt?: number;
    pagination: PaginationInfo;
}

