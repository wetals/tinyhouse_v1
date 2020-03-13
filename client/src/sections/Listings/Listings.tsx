import React from 'react';
import { server, useQuery } from '../../lib/api';
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
  //fetch
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);
  //delete
  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });
    refetch();
  };
  const listings = data ? data.listings : null;
  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}{' '}
            <button onClick={() => deleteListings(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;
  if (loading) {
    return <h2>Loading ...</h2>;
  }
  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later .. :(</h2>;
  }
  return (
    <div>
      <h1>{title}</h1>
      {listingsList}
    </div>
  );
};
