export type Content = {
  id: string;
  url: string;
  title: string;
  source:
    | "YouTube"
    | "Tiktok"
    | "Twitter"
    | "Instagram"
    | "Quora"
    | "Reddit"
    | "LinkedIn"
    | "Facebook"
    | "Medium";
  tags: string[];
  userId: string;
  createdAt: Date;
  remindAt?: Date;
  thumbnail?: string;
  isFavorite?: boolean;
};
