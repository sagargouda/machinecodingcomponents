import React, { useState, useEffect } from 'react';

function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let timeout;
        if (submitted) {
            timeout = setTimeout(() => {
                localStorage.removeItem('details');
                setSubmitted(false); // Reset submitted state after details are removed
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [submitted]);

    function handleSubmit() {
        if (name === '' || password === '') {
            setError('Both fields are required.');
            return;
        }
        setSubmitted(true);
        localStorage.setItem('details', JSON.stringify({ name, password }));
        setError('');
    }

    return (
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            {submitted && (
                <div>
                    <p>Name: {name}</p>
                    <p>Password: {password}</p>
                </div>
            )}
        </>
    );
}

export default Login;
