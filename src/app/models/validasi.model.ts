export interface Validasi {
    id: number;
    odp: string;
    tanggal_validasi: string;
    status: number;
    validasi: {
        port: number;
        barcode: string;
    }[];
}