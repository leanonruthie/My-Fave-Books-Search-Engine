// TODO from README - `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.

// CODE REFERENCE: 26-Stu_Resolver-Context/Solved/client/src/utils/queries.js

import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
