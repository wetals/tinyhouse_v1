import { ObjectId, Collection } from 'mongodb';

export enum ListingType {
  Apartment = 'apartment',
  House = 'house'
}
export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
}

export interface Booking {
  _id: ObjectId;
}
export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
}
export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
}
