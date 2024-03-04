export interface Results {
  data: CastMember[];
  meta: Meta;
}

export interface CastMember {
  id: string;
  name: string;
  type: number;
  created_at: string;
}

export interface Meta {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}
