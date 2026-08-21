export interface Space {
  id: number;
  name: string;
  location: string;
  type: string;
  description: string;
  capacity: number;
  price: number;
  imageUrl: string;
  available: boolean;
}