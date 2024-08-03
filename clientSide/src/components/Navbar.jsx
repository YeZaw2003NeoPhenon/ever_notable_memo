import React from 'react';
import {  faPlus, faSignOutAlt, faSignInAlt, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.css'
export const Navbar = ({handleShowAddNote , handleLogout , handleShowSignup , handleShowAllNotes}) => {
    return(
        <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
        <li className="nav-item">
            <a href="/" className="nav-link rounded-pill note-link" onClick={handleShowAllNotes}>
                <FontAwesomeIcon icon={faStickyNote} className="mr-2" /> All Notes
            </a>
        </li>
        <li className="nav-item">
            <a href="/" className="nav-link rounded-pill note-link">
            <FontAwesomeIcon icon={faStickyNote} className="mr-2" /> Business
            </a>
        </li>
        {/* More nav items */}
        {sessionStorage.getItem("email") ? (
            <>
                <li className="nav-item ml-auto">
                    <a 
                        className="nav-link btn-primary rounded-pill"
                        
                        onClick={handleShowAddNote}   
                    >
                       <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Notes
                    </a>
                </li>
                <li className="nav-item mr-auto">
                    <a
                        className="nav-link btn-primary rounded-pill"
                        onClick={handleLogout}
                    >
                     <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                    </a>
                </li>
            </>
        ) : (
            <li className="nav-item mr-auto">
                <a
                    className="nav-link btn-primary rounded-pill"
                    onClick={handleShowSignup}
                >
                   <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login
                </a>
            </li>
        )}
    </ul>
    )
}