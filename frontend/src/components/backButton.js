import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WidgetFixedHeight from './BaseWidgets/WidgetFixedHeight';

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import React from 'react';

export default function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleBackClick} >
            <WidgetFixedHeight height={60} className="aspect-square justify-center text-xl">
                <FontAwesomeIcon icon={faChevronLeft} className="inline-block text-center align-center"/>
            </WidgetFixedHeight>
        </button>
    );
}