import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Task, SortKey } from '../../types/Task';
import { Button, List, ListItem, ListItemText, Chip, Box, Typography, Select, MenuItem } from '@mui/material';
import { Delete, CheckCircle, PanoramaFishEye } from '@mui/icons-material';
import AddTask from './AddTask';


export default function TodoList() {
    const { user, signOut, addTask, toggleTask, deleteTask, } = useAuth();
    const [sortKey, setSortKey] = useState<SortKey>('default');
    const [openAddTask, setOpenAddTask] = useState(false);

    const sortedTasks = [...user?.tasks || []].sort((a, b) => {
        if (sortKey === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sortKey === 'deadline') {
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        return 0;
    });



    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Welcome {user?.email}</Typography>
                <Button onClick={signOut} variant="contained" color="secondary">
                    Sign Out
                </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="priority">Priority</MenuItem>
                    <MenuItem value="deadline">Deadline</MenuItem>
                </Select>
                <Button variant="contained" onClick={() => setOpenAddTask(true)}>Add Task</Button>
            </Box>

            <List>
                {sortedTasks.map((task) => (
                    <ListItem key={task.id} sx={{
                        bgcolor: task.completed ? '#e8f5e9' : 'white',
                        mb: 1,
                        boxShadow: 1,
                        borderRadius: 1
                    }}>
                        <ListItemText
                            primary={task.title}
                            secondary={
                                <>
                                    {task.description}<br />
                                    Deadline: {new Date(task.deadline).toLocaleString()}<br />
                                    <Chip
                                        label={task.priority}
                                        size="small"
                                        color={
                                            task.priority === 'high' ? 'error' :
                                                task.priority === 'medium' ? 'warning' : 'success'
                                        }
                                    />
                                </>
                            }
                        />
                        <Button onClick={() => toggleTask(task.id)}>
                            {task.completed ? <CheckCircle color="success" /> : <PanoramaFishEye />}
                        </Button>
                        <Button onClick={() => deleteTask(task.id)}>
                            <Delete color="error" />
                        </Button>
                    </ListItem>
                ))}
            </List>

            <AddTask open={openAddTask} onClose={() => setOpenAddTask(false)} onAddTask={addTask} />




        </Box>
    )
}
