import { gql } from 'apollo-server-express';

export const LOG_OUT = gql`
  mutation LogOut {
    logOut {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
