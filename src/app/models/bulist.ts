export interface BUList {
    id: number;
    buName: string;
    buId: number;
    logo_path: string;
}


export interface JobList {
    buId: number;
    openingId: number;
    openTitle: string;
    createdDate?: Date;
}

export interface JobListRateCard {
    openingId: number;
    openTitle: number;
    fromDate: Date;
    tillDate: Date;
    fixedShare: string;
    bonusShare: string;
    id: number;
    createdDate: Date;
    rcOpeningId: number;
}