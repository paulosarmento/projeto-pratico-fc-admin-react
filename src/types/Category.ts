export interface Results {
  categories: Category[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Category;
  meta: Meta;
  links: Links;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  deleted_at: null;
  created_at: Date;
  updated_at?: Date;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
