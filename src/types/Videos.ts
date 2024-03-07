import { CastMember } from "./CastMembers";
import { Category } from "./Category";
import { Genre } from "./Genres";

export interface Results {
  data: Video[];
  meta: Meta;
}

export interface Result {
  data: Video;
  meta: Meta;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  duration: number;
  rating: string;
  is_opened: boolean;
  is_published: boolean;
  categories_id: string[];
  categories: Category[];
  genres_id: string[];
  genres: Genre[];
  cast_members_id: string[];
  cast_members: CastMember[];
  created_at: Date;
}

export interface Meta {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface VideoParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
