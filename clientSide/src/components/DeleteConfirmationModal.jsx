import { Modal, Button,ModalHeader ,ModalTitle,ModalBody,ModalFooter} from "react-bootstrap";


export const DeleteConfirmationModal = ({handleDeleteNote,show,handleClose}) => {
    return(
        <Modal show={show} onHide={handleClose} centered>
            <ModalHeader closeButton>
                <ModalTitle>Confirm Deletion</ModalTitle>
            </ModalHeader>
            <ModalBody>
                Are you sure you want to delete this note? This action cannot be undone.
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteNote}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    )
}