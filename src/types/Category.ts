// export interface Results {
//   type: Type;
//   id: string;
//   name: string;
//   is_active: boolean;
//   created_at: Date;
//   updated_at: Date;
// }
// export enum Type {
//   Categories = "categories",
// }

// export interface Result {
//   type: Type;
//   id: string;
//   name: string;
//   is_active: boolean;
//   created_at: Date;
//   updated_at: Date;
// }

export interface Results {
  mata: Meta;
  links: Links;
  data: Category[];
}

export interface Result {
  data: Category;
  meta: Meta;
  links: Links;
}

export interface Category {
  id: string;
  name: string;
  deleted_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: string | null;
}

export interface Category {
  id: string;
  name: string;
  deleted_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: string | null;
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
  next: string;
  prev: null;
}

export interface CategoryParams {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: boolean;
}
