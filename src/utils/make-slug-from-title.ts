import slugify from 'slugify';

export function makeSlugFromTitle(title: string) {
  const slug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
  return `${slug}-${slugSalt()}`;
}

function slugSalt() {
  return Math.random().toString(36).substring(2, 8);
}
