import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


export default function Login({ onLogin }){
const [name, setName] = useState('')
const submit = e => {
e.preventDefault()
if (!name.trim()) return
onLogin({ id: uuidv4(), name: name.trim() })
}
return (
<div className="center">
<form onSubmit={submit} className="card">
<h2>Join Chat</h2>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
<button type="submit">Join</button>
</form>
</div>
)
}
