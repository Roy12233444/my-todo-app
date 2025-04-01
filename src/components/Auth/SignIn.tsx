import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { SignIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await SignIn(email, password);
            // Navigate directly to /todos on successful signin
            navigate('/todos');
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin='normal'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        margin='normal'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button onClick={() => navigate('/SignUp')} fullWidth sx={{ mt: 3, mb: 2 }}>
                        Don't have an account? Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
