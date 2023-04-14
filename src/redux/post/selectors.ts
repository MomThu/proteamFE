import { RootState } from 'app/store';

export const selectorPost = (state: RootState): Post.Post => {
  return state.post?.post;
};

export const selectorAllPosts = (state: RootState): Post.Post[] => {
  return state.post?.allPosts;
};

export const selectorAllNews = (state: RootState): Post.Post[] => {
  return state.post?.allNews;
};