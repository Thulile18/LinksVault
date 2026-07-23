export interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface LinkFormData {
  title: string;
  url: string;
  description: string;
  tags?: string;
}
