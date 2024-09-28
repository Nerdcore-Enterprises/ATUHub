import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Stylesheet
import './App.css';

// Images
import background from './assets/Background.jpg';
import logo from './assets/logos/vertical.png';
import hide from './assets/icons/hide.png'
import show from './assets/icons/show.png'

// Pages
import HomePage from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUpSignInPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

function SignUpSignInPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formFilled, setFormFilled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSignup) {
            setFormFilled(firstName !== '' && lastName !== '' && email !== '' && password !== '');
        } else {
            setFormFilled(email !== '' && password !== '');
        }
    }, [isSignup, firstName, lastName, email, password]);

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit form data to backend (database)

        navigate('/home');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative w-screen h-screen font-sans">
            <img src={background} alt="Background" className="absolute w-screen h-screen object-cover" />

            <div className="relative flex flex-col items-center justify-center h-full">
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
                                    className="md:w-96 w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="md:w-96 w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                                />
                            </>
                        )}

                        <div className="mb-8">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="md:w-96 w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="md:w-96 w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <img src={hide} alt="Show Password" height={28} width={28} />
                                    ) : (
                                        <img src={show} alt="Show Password" height={28} width={28} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 justify-between">
                            <button
                                className={`${formFilled ? 'bg-[var(--ATUGreen)] text-white cursor-pointer' : 'bg-[#11574044] text-[#ffffff44] cursor-not-allowed'} text-lg font-bold py-4 rounded-full drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] transition-colors duration-300`}
                                type="submit"
                                disabled={!formFilled}
                            >
                                {isSignup ? "Sign up" : "Sign in"}
                            </button>
                            <button
                                className="w-fit px-4 self-center text-white text-lg font-bold rounded-full drop-shadow-[0_3px_2px_rgba(0,0,0,0.8)]"
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

export default App;