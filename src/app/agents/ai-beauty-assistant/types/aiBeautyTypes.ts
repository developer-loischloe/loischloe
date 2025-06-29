export interface Message {
  id: string;
  type: "assistant" | "user" | "recommendation";
  content: string;
  timestamp: Date;
  products?: Product[];
}

export interface UserPreferences {
  category?: string;
  skinType?: string;
  preferences?: string[];
  budget?: string;
  occasion?: string;
  childCategory?: string;
  nestedChildCategory?: string;
}

export interface Product {
  $id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number;
  images: Array<{ image_url: string; alt: string }>;
  short_description: string;
  avg_rating?: number;
  reviews?: any[];
  tags?: string[];
  parent_category?: string;
  child_category?: string;
  nested_child_category?: string;
}

export interface Category {
  $id: string;
  name: string;
  slug: string;
  childCategories?: Category[];
  nestedChildCategories?: Category[];
}
