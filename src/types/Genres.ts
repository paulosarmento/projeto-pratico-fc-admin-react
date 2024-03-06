import { Category } from "./Category";

export interface Genres {
  data: Genre[];
  meta: Meta;
}

export interface Result {
  data: Genre;
  meta: Meta;
}

export interface Results {
  data: Genre[];
  meta: Meta;
}
export interface Genre {
  id: string;
  name: string;
  categories_id: string[];
  categories: Category[];
  is_active: boolean;
  created_at: string;
}

export interface Meta {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface GenrePayload {
  name: string;
  categories_id: (string | undefined)[];
}
