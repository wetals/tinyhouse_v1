import React from 'react';
import { Divider, Skeleton, Alert } from 'antd';
import './styles/ListingsSkeleton.css';
interface Props {
  title: string;
  error?: boolean;
}
export const ListingSkeleton = ({ title, error }: Props) => {
  const errorAlert = error ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong - please try again later .. :'("
      className="listings-skeleton__alert"
    />
  ) : null;
  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton paragraph={{ rows: 1 }} />
    </div>
  );
};
