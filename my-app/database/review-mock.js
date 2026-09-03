const MOCK_REVIEWS = [
  {
    id: 101,
    albumId: 1,
    rating: 5,
    text: 'Excelente álbum!',
    createdAt: new Date(),
  },
  {
    id: 102,
    albumId: 2,
    rating: 4.5,
    text: 'Muito bom',
    createdAt: new Date(),
  },
];

export async function getReviews() {
  return MOCK_REVIEWS;
}

export async function createReview(albumId, rating, text) {
  const newReview = {
    id: MOCK_REVIEWS.length + 1,
    albumId,
    rating,
    text,
    createdAt: new Date(),
  };
  MOCK_REVIEWS.push(newReview);
  return newReview.id;
}
