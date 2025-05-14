export type Content = {
  id: string;
  url: string;
  title: string;
  source?: string;
  tags: string[];
  userId: string;
  createdAt: Date;
  remindAt?: Date;
  thumbnail?: string;
  isFavorite?: boolean;
};
