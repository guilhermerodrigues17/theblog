import { InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, text } from 'drizzle-orm/pg-core';

export const postgresPostsTable = pgTable('posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  coverImageUrl: text('cover_image_url').notNull(),
  published: boolean('published').notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export type PostsSelectModel = InferSelectModel<typeof postgresPostsTable>;
export type PostsInsertModel = InferSelectModel<typeof postgresPostsTable>;
