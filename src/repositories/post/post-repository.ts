import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  //Read operations
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;

  //Write operations
  deletePost(id: string): Promise<PostModel>;
  createPost(post: PostModel): Promise<PostModel>;
}
