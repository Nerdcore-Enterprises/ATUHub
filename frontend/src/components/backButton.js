import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import React from 'react';

export default function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleBackClick} className="bg-white rounded-full p-4 w-16 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    );
}