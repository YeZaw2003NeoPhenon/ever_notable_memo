import React, { useState } from 'react';
import { Card, Form, CardBody, CardHeader, CardSubtitle, CardTitle, Container, FormControl, FormGroup, Row, FormLabel, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAlertMessage } from '../components/useAlertMessage';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope , faUser  , faSyncAlt , faLock , faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './authCompo.css'
export const AuthComp = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { alertMessage, alertVariant, showAlertMessage } = useAlertMessage();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const url = isLogin ? 'http://localhost:8080/api/users/login' : 'http://localhost:8080/api/users/create';
        const playload = isLogin ? {email: data.email,password: data.password} : { name: data.name, email: data.email,password: data.password,}

        if(isLogin) {
            const response = await axios.post(url,playload);
            try {
                if (response.status === 200) {
                    showAlertMessage('Account Logged in Renumeratively', 'success');
                    sessionStorage.setItem('email', data.email);
                    onLoginSuccess();
                    navigate('/home');
                } else {
                    showAlertMessage('Login failed. Please try again.', 'danger');
                }
            } catch (err) {
                console.error('Login error:', err);
                if (err.response && err.response.status === 401) {
                    showAlertMessage('Unauthorized. Please check your credentials.', 'danger');
                } else {
                    showAlertMessage('Login failed. Please try again.', 'danger');
                }
            }
        } else {
            try {
                if (response.status === 201) {
                    showAlertMessage('User Created Successfully', 'success');
                } else {
                    showAlertMessage('Account creation failed. Please try again.', 'danger');
                }
            } catch (err) {
                console.error('Account creation error:', err);
                showAlertMessage('Account creation error', 'danger');
            }
            if( sessionStorage.getItem('email')){
                sessionStorage.removeItem('email')
                sessionStorage.setItem('email', email);
            }
            else{
                sessionStorage.setItem('email', email);
            }
        }
    };
    
    const toggleForm = () => {
        setIsLogin(!isLogin);
        reset();
    };

    return (
        <Container>
            <Row>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2><FontAwesomeIcon icon={isLogin ? faSignInAlt : faUserPlus}/>{isLogin ? 'Login' : 'Create Account'}</h2>
                        </CardTitle>
                        <CardSubtitle className="fw-bold text-sm text-muted">Please fill out the form to {isLogin ? 'login' : 'create an account'}.</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            {!isLogin && (
                                <FormGroup>
                                      <FormLabel><FontAwesomeIcon icon={faUser} /> Name</FormLabel>
                                    <FormControl
                                        type='text'
                                        {...register('name', { required: 'Name is required!' })}
                                    />
                                    <FormControl.Feedback type='invalid' variant='danger'>
                                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                    </FormControl.Feedback>
                                </FormGroup>
                            )}
                            <FormGroup>
                            <FormLabel><FontAwesomeIcon icon={faEnvelope} /> Email</FormLabel>
                                <FormControl
                                    type='email'
                                    {...register('email', { required: 'Email is required!' })}
                                />
                                <FormControl.Feedback type='invalid' variant='danger'>
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup>
                            <FormLabel><FontAwesomeIcon icon={faLock} /> Password</FormLabel>
                                <FormControl
                                    type='password'
                                    {...register('password', { required: 'Password is required!' })}
                                />
                                <FormControl.Feedback type='invalid' variant='danger'>
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                </FormControl.Feedback>
                            </FormGroup>

                            <Button type="submit" className="btn btn-primary mt-3 p-3 d-block w-50 rounded-pill">
                            <FontAwesomeIcon icon={isLogin ? faSignInAlt : faUserPlus} /> {isLogin ? 'Login' : 'Create Account'}
                            </Button>
                        </Form>
                        <Button className="btn btn-secondary mt-3" onClick={toggleForm}>
                           <FontAwesomeIcon icon={faSyncAlt} /> {isLogin ? 'Switch to Create Account' : 'Switch to Login'}
                        </Button>
                    </CardBody>
                </Card>
                {alertMessage && <Alert className="fw-bold" variant={alertVariant}>{alertMessage}</Alert>}
            </Row>
        </Container>
    );
};