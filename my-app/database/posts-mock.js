const MOCK_POSTS = [];

export async function createPost(title, content, imageUri) {
  const newPost = {
    id: MOCK_POSTS.length + 1,
    title,
    content,
    imageUri,
    createdAt: new Date(),
  };
  MOCK_POSTS.push(newPost);
  return newPost.id;
}

export async function getPosts() {
  return MOCK_POSTS;
}
