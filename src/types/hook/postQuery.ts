export const queryKey = {
  scheme: () => ["scheme"],
  posts: () => ["posts"],
  shorts: () => ["shorts"],
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],
};
