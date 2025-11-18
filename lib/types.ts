export type Content = {
  id: string;
  url: string;
  title: string;
  source?: string;
  tags: string[];
  userId: string;
  createdAt: Date;
  remindAt?: Date | null;
  thumbnail?: string;
  isFavorite?: boolean;
};
