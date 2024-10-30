import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/default.css';

// Images
import background from '.././assets/Background.jpg';
import logo from '.././assets/logos/ATUHub-Vertical-1024.png';
import hide from '.././assets/icons/hide.png'
import show from '.././assets/icons/show.png'

export default function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formFilled, setFormFilled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSignup) {
            setFormFilled(firstName !== '' && lastName !== '' && username !== '' && password !== '');
        } else {
            setFormFilled(username !== '' && password !== '');
        }
    }, [isSignup, firstName, lastName, username, password]);

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignup ? '/api/signup' : '/api/login';
        const payload = isSignup ? { firstName, lastName, username, password } : { username, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                navigate('/home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative w-screen h-screen font-sans m-0">
            <img src={background} alt="Background" className="absolute w-screen h-screen object-cover top-0 left-0 z-0" />

            <div className="relative flex flex-col items-center justify-center h-full z-10">
                <div className="px-8 rounded-lg md:w-auto w-full bg-opacity-90">
                    <img src={logo} alt="ATUHub" className="mx-auto w-48 h-auto" />

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {isSignup && (
                            <>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="md:w-72 w-full px-6 py-3 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="md:w-72 w-full px-6 py-3 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] text-sm"
                                />
                            </>
                        )}

                        <div className="mb-8">
                            <input
                                type="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="md:w-72 w-full px-6 py-3 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] text-sm"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="md:w-72 w-full px-6 py-3 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] text-sm"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <img src={hide} alt="Show Password" height={20} width={20} />
                                    ) : (
                                        <img src={show} alt="Show Password" height={20} width={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 justify-between">
                            <button
                                className={`${formFilled ? 'bg-[var(--ATUGreen)] text-white cursor-pointer' : 'bg-[#22222222] text-[#ffffff77] cursor-not-allowed'} text-md font-bold py-4 rounded-full drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] transition-colors duration-500`}
                                type="submit"
                                disabled={!formFilled}
                            >
                                {isSignup ? "Sign up" : "Sign in"}
                            </button>
                            <button
                                className="w-fit px-4 self-center text-white text-sm font-bold rounded-full drop-shadow-[0_3px_2px_rgba(0,0,0,0.8)]"
                                type="button"
                                onClick={toggleForm}
                            >
                                {isSignup ? "Switch to Sign in" : "Switch to Sign up"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}