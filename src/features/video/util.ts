import { Video, VideoPayload } from "../../types/Videos";

export function mapVideoToForm(video: Video): VideoPayload {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    year_launched: video.year_launched,
    is_opened: video.is_opened,
    rating: video.rating,
    duration: video.duration,
    categories_id: video.categories?.map((category) => category.id),
    genres_id: video.genres?.map((genre) => genre.id),
    cast_members_id: video.cast_members?.map((cast_member) => cast_member.id),
  };
}
