export interface PostState {
  allPosts: Post.Post[],
  allUserPosts: Post.Post[],
  post: Post.Post,
  filterPosts: Post.Post[],
  hasMoreSearch: boolean,
}

export interface CreatePost {
  content: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skills: any,
  min_gpa: number,
  max_gpa: number,
  image: string,
}