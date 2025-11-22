export interface IReview {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    email: string;
    name: string;
    photo: string;
  };
}
