import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingsData,
  DeleteListingsVariables
} from './__generated__/DeleteListing';
import { gql } from 'apollo-boost';
import { Alert, List, Button, Avatar, Spin } from 'antd';
import './styles/Listings.css';
import { ListingSkeleton } from './components';

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
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={listing => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListings(listing.id)}
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingSkeleton title={title} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="listings">
        <ListingSkeleton title={title} error />
      </div>
    );
  }

  const deleteListingErrorMessage = deleteListingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong with deleting - please try again later .. :'("
      className="listings__alert"
    />
  ) : null;

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        {deleteListingErrorMessage}
        <h1>{title}</h1>
        {listingsList}
      </Spin>
    </div>
  );
};
