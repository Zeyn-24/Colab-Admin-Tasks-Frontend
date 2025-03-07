import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './components/routes/ProtectedRoutes'
import { PublicRoutes } from './components/routes/PublicRoutes'

import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import NotFound from './pages/NotFound'
import CreateTask from './pages/CreateTask'

function AppRouter() {
    return (
        <Routes>
            <Route element={<PublicRoutes />} >
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>

            <Route element={<ProtectedRoutes />} >
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/tasks' element={<Tasks />} />
                <Route path='/create-task' element={<CreateTask />} />
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter