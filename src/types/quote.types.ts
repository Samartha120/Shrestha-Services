export interface QuoteRequest {
  id?: string;
  serviceId: string;
  customerName: string;
  email: string;
  phone: string;
  width?: number;
  height?: number;
  notes?: string;
}

export interface QuoteResponse {
  quoteId: string;
  status: string;
}