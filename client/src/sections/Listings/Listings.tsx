import React from 'react';
import { server } from '../../lib/api';
import {
  ListingsData,
  DeleteListingsData,
  DeleteListingsVariables
} from './types';

const LISTINGS = `
    query Listings {
        listings{
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            numOfBaths
            rating
          }
    }
`;

const DELETE_LISTING = `
    mutation DeleteListing($id: ID!) {
      deleteListing(id : $id) {
        id
      }
    }
`;

interface Props {
  title: string;
}
export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };
  const deleteListings = async () => {
    const { data } = await server.fetch<
      DeleteListingsData,
      DeleteListingsVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: '5e692ddd36f9ff32bd2d22c7'
      }
    });
    console.log(data);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListings}>Delete Listings</button>
    </div>
  );
};
