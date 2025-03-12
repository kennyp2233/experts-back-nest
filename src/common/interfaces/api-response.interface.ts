// src/common/interfaces/api-response.interface.ts
export interface ApiResponse<T = any> {
    ok: boolean;
    msg?: string;
    data?: T;
    error?: string;
}