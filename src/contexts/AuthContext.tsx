import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

interface User {
    email: string;
    password: string;
    tasks: Task[];
}


interface AuthContextType {
    user: User | null;
    SignUp: (email: string, password: string) => void;
    SignIn: (email: string, password: string) => boolean;
    signOut: () => void;
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
    toggleTask: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    //sign-up:
    const SignUp = (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some((u: User) => u.email === email)) {
            alert('User already exists!');
            return;
        }

        const newUser = { email, password, tasks: [] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
    };


    //sign-in:
    const SignIn = (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find((u: User) => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('user', JSON.stringify(foundUser));
            return true;
        } else {
            alert('Invalid email or password!');
            return false;
        }
    };


    //singOut:
    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Task Management function

    const updateUserTasks = (newTasks: Task[]) => {
        const updatedUser = { ...user!, tasks: newTasks };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
        const newTask: Task = {
            ...task,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            completed: false,
        };
        updateUserTasks([...user!.tasks, newTask]);
    };

    const toggleTask = (taskId: string) => {
        const updatedTasks = user!.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        updateUserTasks(updatedTasks);
    };
    const deleteTask = (taskId: string) => {
        const filteredTasks = user!.tasks.filter(task => task.id !== taskId);
        updateUserTasks(filteredTasks);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                SignUp,
                SignIn,
                signOut,
                addTask,
                toggleTask,
                deleteTask,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);

