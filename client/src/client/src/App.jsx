import React, { useState } from 'react'
import Login from './pages/Login'
import Chat from './pages/Chat'


export default function App(){
const [user, setUser] = useState(null)
return user ? <Chat user={user} /> : <Login onLogin={setUser} />
