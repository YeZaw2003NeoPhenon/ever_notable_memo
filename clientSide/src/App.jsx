import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { AuthComp } from './auth/AuthCompo';
import { Modal , ModalBody , ModalHeader , ModalDialog , ModalTitle} from 'react-bootstrap';
import { Navbar } from './components/Navbar';
import axios from 'axios'
import { useAlertMessage } from './components/useAlertMessage';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { NoteForm } from './components/NoteForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(true);

    const [showAddNoteModal, setShowAddNoteModal] = useState(false);    
    const[showAllNotes , setShowAllNotes] = useState(false)
    const [notes, setNotes] = useState([]);
    const [isLoading , setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const {alertMessage , alertVariant , showAlertMessage} = useAlertMessage()
    const[currentNote , setCurrentNote ] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false); 

    const[showDeleteModal, setShowDeleteModal] = useState(false)
    const[deleteId , setDeleteId ] = useState()
    
    useEffect(() => {
        const email = sessionStorage.getItem('email');
        if (email) {
            setIsLoggedIn(true);
            setShowAuthModal(false);
        } else {
            setShowAuthModal(true);
        }
    }, []);

    useEffect(() => {
        console.log('Notes:', notes); 
    }, [notes]);
    
    useEffect(() => {
        if(isLoggedIn || showAllNotes){
            fetchNotes()
        }
    },[isLoggedIn])

    const fetchNotes = async() => {
            try {
                const email = sessionStorage.getItem('email');
                console.log(`Fetching notes for email: ${email}`);
                const resultUrl = showAllNotes ? 'http://localhost:8080/api/notes/'
                                               : `http://localhost:8080/api/notes/selectUser/${email}`;

                // const resultUrl = `http://localhost:8080/api/notes/selectUser/${email}`
                             console.log('Request URL:', resultUrl);
                const response = await axios.get(resultUrl);
                setNotes(response.data);
                setIsLoggedIn(true)
                console.log('Response data:', response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setError(error)
                showAlertMessage(`There is an error while fetching notes: ${error}`, 'danger');
            }
            finally{
                setIsLoading(false)
            }
    }

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowAuthModal(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('email')
        setIsLoggedIn(false);
        window.location.reload();
    }

    const handleShowAllNotes = () => {
        setShowAllNotes(true)
        setIsLoggedIn(false)
    }

    const handleShowAddNote = (note) => {
        if (isUpdating) {
            setCurrentNote(note);
        } else {
            setCurrentNote(null);
        }
        setShowAddNoteModal(true)
    };

    const handleCloseAddNote = () => {
        setShowAddNoteModal(false)
        setCurrentNote(null)
        setIsUpdating(false)
    }

    const handleShowSignup = () => setShowAuthModal(true);

    const handleAuthCloseModal = () => setShowAuthModal(false);

    const handleAddNote = async(note) => {
        try{
            const email = sessionStorage.getItem('email')
            // const newNote = {title : note.title , content : note.content }
            const response = await axios.post(`http://localhost:8080/api/notes/create/${email}`, note);
            // setNotes( (prevNotes) => [...prevNotes , response.data])
            showAlertMessage('Note added successfully', 'success');
                fetchNotes()
        }
        catch( error ){
            console.error('Error adding note:', error);
            showAlertMessage(`Error adding note: ${error}`, 'danger');
        }
    }

    const handleEditNote = (id) => {
        const targetNote = notes.find( note => note.id === id );
        setCurrentNote(targetNote)
        setShowAddNoteModal(true)
        setIsUpdating(true)
    }

    const handleUpdateNote = async(updatedNote) => {
        try{
            const response = await axios.put(`http://localhost:8080/api/notes/update/${currentNote.id}` , updatedNote);
            const newNotes = notes.map( note => (note.id === currentNote.id) ? response.data : note )
            // setNotes(newNotes)
            showAlertMessage('Note updated successfully', 'success');
            
                fetchNotes()
            
        }
        catch(error){
            console.error('Error updating note:', error);
            showAlertMessage(`Error updating note: ${error}`, 'danger');
        }
    }

    const handleSubmitNote = async (note) => {
        try {
            if (isUpdating) {
                await handleUpdateNote(note);
            } else {
                await handleAddNote(note);
            }
            handleCloseAddNote();
        } catch (error) {
            console.error('Error submitting note:', error);
            showAlertMessage(`Error submitting note: ${error}`, 'danger');
        }
    };


    const handleDeleteNote = async() => {
        try{
          setTimeout( async() => {
            await axios.delete(`http://localhost:8080/api/notes/delete/${deleteId}`)
            const deletedNotes = notes.filter( note => note.id !== deleteId );
            setNotes(deletedNotes)
            showAlertMessage('Note deleted successfully', 'success');
            setShowDeleteModal(false)
          },2000)
        }
        catch(error) {
        console.error('Error deleting note:', error);
        showAlertMessage(`Error deleting note: ${error}`, 'danger');

        }
    }

    const handleShowDeleteModal = (noteId) => {
        setDeleteId(noteId)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };


    return (
        <Router>
            <Navbar
             handleShowAddNote = {handleShowAddNote}
             handleShowSignup = {handleShowSignup}
             handleLogout = {handleLogout}
             handleShowAllNotes = {handleShowAllNotes}
            />

            <Routes>
                <Route path="/home" element={isLoggedIn ? 
                <Home notes = {notes} isLoading = {isLoading} error = {error}
                 alertMessage = {alertMessage} alertVariant={ alertVariant}
                 onUpdate = {handleEditNote}
                 onDelete = {handleShowDeleteModal}/> 
                 : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>

            <Modal show={showAuthModal} onHide={handleAuthCloseModal} centered>
                <ModalHeader closeButton>
                    <ModalTitle>{isLoggedIn ? 'Create Account' : 'Log In'}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <AuthComp onLoginSuccess={handleLoginSuccess} />
                </ModalBody>
            </Modal>

            <Modal show={showAddNoteModal} onHide={handleCloseAddNote} centered>
                <ModalHeader closeButton>
                    <ModalTitle>{isUpdating ? 'Update Note' : 'Add Note'}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <NoteForm handleClose={handleCloseAddNote} 
                     handleSubmitNote={handleSubmitNote} currentExistingNote = {currentNote}
                     alertMessage = {alertMessage}
                     alertVariant={ alertVariant}/>
                </ModalBody>
            </Modal>
            <DeleteConfirmationModal handleDeleteNote = {handleDeleteNote} 
            show = {showDeleteModal}
            handleClose = {handleCloseDeleteModal}/>
        </Router>
    );
}

export default App;