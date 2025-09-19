import { PublicUserDataDto } from '@/lib/user/schemas';

export type PostModel = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: string;
};

export type UpdatePostModel = Omit<
  PostModel,
  'id' | 'slug' | 'createdAt' | 'updatedAt'
>;

export type ExternalPostModel = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: PublicUserDataDto;
};
