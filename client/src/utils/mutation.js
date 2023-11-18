// Important for useMutation: We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
import { gql } from '@apollo/client';

// Important for useMutation: Each mutation we'd like to be able to perform gets exported out of our mutations.js utility
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
    }
  }
}
`
export const SAVE_BOOK = gql`
mutation saveBook($bookInput: BookInput) {
  saveBook(bookInput: $bookInput) {
    _id
    username
    email
    bookCount
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    bookCount
  }
}

`