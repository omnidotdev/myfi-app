export type Tag = {
  id: string;
  name: string;
  code: string | null;
  isActive: boolean;
};

export type TagGroup = {
  id: string;
  name: string;
  tags: Tag[];
};
