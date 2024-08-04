import { useFormik } from "formik"
import * as Yup from 'yup'
import { useEffect,useState } from 'react';
import { Alert , FormGroup , FormControl ,Container , Form, FormLabel, ButtonGroup , Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave , faTimes , faCheckCircle ,faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import './noteForm.css'
export const NoteForm = ({handleClose ,handleSubmitNote,currentExistingNote,alertMessage ,alertVariant}) => {

    const isEditing = !!currentExistingNote;
    const [showAlert, setShowAlert] = useState(false);
    const formik = useFormik({
        initialValues : {
            title: '',
            content: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            content: Yup.string()
                .max(500, 'Must be 500 characters or less')
                .required('Required')
        }),
        onSubmit: async (values , {setSubmitting}) => {
            try{
                await handleSubmitNote({
                    id: isEditing ? currentExistingNote.id : null,
                    title: values.title,
                    content: values.content
                })
                handleClose();
            }
            catch(error){
                formik.setStatus('Failed to save note')
            }
            finally{
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        console.log("Current Existing Note:", currentExistingNote);
        console.log("Formik Values before update:", formik.values);    
        if(isEditing && currentExistingNote){
            formik.setValues({
                title : currentExistingNote.title,
                content : currentExistingNote.content ,
            })
        }
        else{
            formik.resetForm()
        }
    },[currentExistingNote , isEditing])

    useEffect(() => {
        if (alertMessage) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000); 
        }
    }, [alertMessage]);

    const handleFormSubmit = (e) => {
        e.preventDefault()
        formik.handleSubmit()
    }

    return(
        <Container>
            { showAlert && formik.status && (
                <Alert className={`alert-custom ${alertVariant} ${showAlert ? '' : 'fade-out'}`} variant={alertVariant}>
                    <FontAwesomeIcon 
                        icon={alertVariant === 'success' ? faCheckCircle : faExclamationCircle} 
                        className="icon" 
                    />{formik.status}
                    </Alert>
            )}
                <Form noValidate onSubmit={handleFormSubmit} className="note-form">
                <FormGroup controlId="formTitle">
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl
                        type="text"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        isInvalid={formik.touched.title && formik.errors.title}
                    />
                    <FormControl.Feedback type="invalid"  variant = "danger">
                        {formik.errors.title}
                    </FormControl.Feedback>
                </FormGroup>
                <FormGroup controlId="formContent">
                    <Form.Label htmlFor="content">Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="content"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                        isInvalid={formik.touched.content && formik.errors.content}
                    />
                    <FormControl.Feedback type="invalid" variant = "danger">
                        {formik.errors.content}
                    </FormControl.Feedback>
                </FormGroup>
                <ButtonGroup>
                <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faSave} className="me-2"/>
                    {isEditing ? 'Update Note' : 'Add Note'}
                </Button>
                <Button variant="secondary" className="mt-3 ms-2" onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                    Cancel
                </Button>
                </ButtonGroup>
            </Form>
        </Container>
    )
}