import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingsData,
  DeleteListingsVariables
} from './__generated__/DeleteListing';
import { gql } from 'apollo-boost';

const LISTINGS = gql`
  query Listings {
    listings {
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
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
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingsData, DeleteListingsVariables>(DELETE_LISTING);

  const handleDeleteListings = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;
  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}{' '}
            <button onClick={() => handleDeleteListings(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading ...</h2>;
  }
  if (error) {
    return (
      <h2>Uh oh! Something went wrong - please try again later .. :'( </h2>
    );
  }
  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress ...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting - please try again later .. :'({' '}
    </h4>
  ) : null;
  return (
    <div>
      <h1>{title}</h1>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
