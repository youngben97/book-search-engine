import { useState } from 'react';
// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
// import useMutation
// import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
// Import the query we are going to execute from its file
import { GET_ME } from '../utils/queries';
// import { REMOVE_BOOK } from '../utils/mutation';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});
  const { meId } = useParams();
  const { loading, data } = useQuery(GET_ME, {
    variables: { meId: meId },
  });

  const me = data?.me || [];

  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!me.data) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          {loading ? (
            <h1> Loading...</h1>
          ) : (
          <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {me.savedBooks.length
            ? `Viewing ${me.savedBooks.length} saved ${me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {me.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
