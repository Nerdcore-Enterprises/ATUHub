import React, { useState } from 'react';
import background from './assets/Background.jpg';
import logo from './assets/logos/vertical.png';
import './App.css';

function App() {
    const [isSignup, setIsSignup] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted!", { firstName, lastName, email, password });
    };

    return (
        <div className="relative w-screen h-screen font-sans">
            <img src={background} alt="Background" className="absolute w-screen h-screen object-cover" />

            <div className="relative flex flex-col items-center justify-center h-full">
                <div className="p-8 rounded-lg max-w-md w-full bg-opacity-90">
                    <img src={logo} alt="ATUHub" className="mx-auto w-64 h-64" />

                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                                />
                            </>
                        )}

                        <div className="mb-8">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-4 rounded-full my-2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-4 justify-between">
                            <button
                                className="bg-[var(--ATUGreen)] text-white text-lg font-bold py-4 rounded-full drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
                                type="submit"
                            >
                                {isSignup ? "Signup" : "Login"}
                            </button>
                            <button
                                className="text-white text-lg font-bold rounded-full drop-shadow-[0_3px_2px_rgba(0,0,0,0.8)]"
                                type="button"
                                onClick={toggleForm}
                            >
                                {isSignup ? "Switch to Login" : "Switch to Signup"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;