export type Hush = {
  _id?: string;
  name: string;
  mimeType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Hushbox = {
  _id?: string;
  name: string;
  hushes: Hush[];
  createdAt?: Date;
  updatedAt?: Date;
}