interface LightnovelDetailData {
  id: string;
  url_id: string;
  name: string;
  other_names: string[];
  author?: string | undefined;
  illustrator?: string | undefined;
  image?: string | undefined;
  categories: Category[];
  summary: string;
  deleted: boolean;
  status: string;
  note?: string | undefined;
  user_id: number;
  created_at: number;
  updated_at: number;
}
