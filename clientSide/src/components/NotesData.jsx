import { Container, Card ,CardHeader,CardBody,CardTitle,CardSubtitle,CardText ,Alert} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import './cardstyling.css';

export const NotesData = ({ id ,  title, content, alertMessage, alertVariant, onUpdate , onDelete }) => {

    return (
        <Container>
            {alertMessage && <Alert className="text-center fw-bold" variant={alertVariant}>{alertMessage}</Alert>}
            <Card style={{ width: '100%' , margin: '1rem' }} className="note-card">
                <CardHeader className="note-card-header">
                <div className="d-flex justify-content-between align-items-center">            
                 <div>
                 <CardTitle className="note-card-title">{title}</CardTitle>
                 <CardSubtitle className="mb-2 text-muted">{new Date().toLocaleDateString()}</CardSubtitle>
                 </div>
                    <div className="note-card-footer">
                         <FontAwesomeIcon
                                icon={faEdit}
                                className="edit-icon"
                                onClick={() => onUpdate(id)}
                                style={{ cursor: 'pointer', marginRight: '1rem', color: 'blue' }}
                            />
                            <div className="trash-icon-container" onClick={() => onDelete(id)}>
                                <div className="trash-can">
                                    <FontAwesomeIcon icon={faTrash} className="trash-can-body" />
                                    <div className="trash-can-lid"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <CardText className="note-card-content">{content}</CardText>
                </CardBody>
            </Card>
        </Container>
        
    );
};