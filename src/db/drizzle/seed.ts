import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { db } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonRepository = new JsonPostRepository();
  const posts = await jsonRepository.findAll();

  //Reset database seeding
  try {
    await db.delete(postsTable); //delete all posts table
    await db.insert(postsTable).values(posts);
  } catch (e) {
    console.log(e);
  }
})();
