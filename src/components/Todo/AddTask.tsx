import React, { useState } from 'react'
import { Task } from '../../types/Task';
import { Button, TextField, Box, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


interface AddTakProps {
    open: boolean;
    onClose: () => void;
    onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
}

export default function AddTask({ open, onClose, onAddTask }: AddTakProps) {

    const [task, setTask] = useState<Omit<Task, 'id' | 'createdAt' | 'completed'>>({
        title: '',
        description: '',
        deadline: '',
        priority: 'medium',
    });

    const handleSubmit = () => {
        if (!task.title || !task.deadline) {
            alert('Title and Deadline are required!');
            return;
        }
        onAddTask(task);
        setTask({ title: '', description: '', deadline: '', priority: 'medium' })
        onClose();
    }



    return (

        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                    />

                    <TextField
                        label=""
                        type="datetime-local"
                        value={task.deadline}
                        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                        required
                        inputProps={{
                            min: new Date().toISOString().slice(0, 16),
                        } as React.InputHTMLAttributes<HTMLInputElement>}
                        sx={{ mt: 2 }} // Optional: Add margin-top for spacing
                    />
                    <TextField
                        select
                        label="Priority"
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value as any })}
                    >
                        {['low', 'medium', 'high'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                </Box>
            </DialogContent>


            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Add Task
                </Button>
            </DialogActions>

      
        </Dialog>

       
    );
}
