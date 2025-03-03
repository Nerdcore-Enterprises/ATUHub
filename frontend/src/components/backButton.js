import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Widget from './BaseWidgets/Widget';

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import React from 'react';

export default function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleBackClick} >
            <Widget className='px-6 py-4 text-xl'>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Widget>
        </button>
    );
}