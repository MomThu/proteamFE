export interface PostState {
  allPosts: Post.Post[],
  allUserPosts: Post.Post[],
  post: Post.Post,
}

export interface CreatePost {
  content: string,
  skills: number[],
  min_gpa: number,
  max_gpa: number,
  image: string,
}