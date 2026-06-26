export type MicroCMSSystemFields = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
};

export type MicroCMSImage = {
  url: string;
  height?: number;
  width?: number;
};
