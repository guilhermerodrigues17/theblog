import { PostModel, UpdatePostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';

const ROOT_DIR = process.cwd();
const JSON_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');

export class JsonPostRepository implements PostRepository {
  private async readFromJson(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);

    const { posts } = parsedJson;
    return posts;
  }

  private async writeToDisk(posts: PostModel[]): Promise<void> {
    const jsonToString = JSON.stringify({ posts }, null, 2);
    await writeFile(JSON_FILE_PATH, jsonToString, 'utf-8');
  }

  async findAllPublic(): Promise<PostModel[]> {
    const posts = await this.readFromJson();
    return posts.filter(post => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromJson();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post not found');

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('Post not found');

    return post;
  }
  async createPost(post: PostModel): Promise<PostModel> {
    const posts = await this.findAll();

    if (!post.id || !post.slug) {
      throw new Error('Post sem ID ou Slug');
    }

    const idOrSlugExist = posts.find(
      savedPost => savedPost.id === post.id || savedPost.slug === post.slug,
    );

    if (idOrSlugExist) {
      throw new Error('ID ou Slug devem ser únicos');
    }

    posts.push(post);
    await this.writeToDisk(posts);

    return post;
  }

  async deletePost(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex < 0) {
      throw new Error('Post não existe');
    }

    const post = posts[postIndex];
    posts.splice(postIndex, 1);
    await this.writeToDisk(posts);

    return post;
  }

  async updatePost(
    id: string,
    updatePostData: UpdatePostModel,
  ): Promise<PostModel> {
    const posts = await this.findAll();
    const postIndex = posts.findIndex(p => p.id === id);
    const savedPost = posts[postIndex];

    if (postIndex < 0) {
      throw new Error('Post não existe');
    }

    const newPost = {
      ...savedPost,
      ...updatePostData,
      updatedAt: new Date().toISOString(),
    };
    posts[postIndex] = newPost;
    await this.writeToDisk(posts);
    return newPost;
  }
}
