import z from 'zod';
import sanitize from 'sanitize-html';
import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import { PublicUserDataSchema } from '../user/schemas';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título deve ter, no mínimo, 3 caracteres')
    .max(120, 'Título deve ter, no máximo, 120 caracteres'),
  content: z
    .string()
    .trim()
    .min(3, 'Conteúdo é obrigatório')
    .transform(val => sanitize(val)),
  author: z
    .string()
    .trim()
    .min(3, 'Autor deve ter, no mínimo, 3 caracteres')
    .max(100, 'Autor deve ter, no máximo, 100 caracteres'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerto deve ter, no mínimo, 3 caracteres')
    .max(200, 'Excerto deve ter, no máximo, 200 caracteres'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'URL da capa deve ser uma URL válida ou um caminho para a imagem',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});

export const CreatePostSchema = PostBaseSchema.omit({
  author: true,
  published: true,
}).extend({});

export const UpdatePostSchema = PostBaseSchema.omit({
  author: true,
}).extend({});

export const PublicPostSchema = PostBaseSchema.extend({
  id: z.string().default(''),
  slug: z.string().default(''),
  title: z.string().default(''),
  excerpt: z.string().default(''),
  author: PublicUserDataSchema.optional().default({
    id: '',
    name: '',
    email: '',
  }),
  content: z.string().default(''),
  coverImageUrl: z.string().default(''),
  createdAt: z.string().default(''),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
export type PublicPostDto = z.infer<typeof PublicPostSchema>;
