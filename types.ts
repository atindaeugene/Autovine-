
export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  features: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface CarType {
  id: string;
  name: string;
  icon: string;
}

export interface VisualizerState {
  carType: string;
  serviceId: string;
}
