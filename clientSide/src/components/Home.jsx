import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAlertMessage } from './useAlertMessage';
import { NotesData } from './NotesData';

export const Home = ({notes , isLoading ,error ,alertMessage, alertVariant , onUpdate , onDelete }) => {

    // useEffect(() => {
    //     console.log("Notes state updated:", notes);
    // }, [notes]);
    
    return (
        <Container>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <Spinner animation="border" />
                </div>
            ) : error ? (
                <Alert variant="danger">There was an error fetching your notes.</Alert>
            ):(
                <>
               { notes.length === 0 ? (
                        <p style={{ marginTop: '3rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'red' }}>
                            There are no notes available at the moment!
                        </p>
                    ) : (
                        <Row>
                            {notes.map((note) => (
                                <Col key={note.id} md={4}>
                                    <NotesData
                                        id = {note.id}
                                        title={note.title}
                                        content={note.content}
                                        alertMessage={alertMessage}
                                        alertVariant={alertVariant}
                                        onUpdate = {onUpdate}
                                        onDelete = {onDelete}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </Container>
    );

};