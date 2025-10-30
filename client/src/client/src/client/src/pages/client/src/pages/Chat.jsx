import React, { useEffect, useRef, useState } from 'react'
})
s.on('users', list => setUsers(list))
s.on('message', msg => {
setMessages(prev => [...prev, msg])
// sound
if (notifAudio.current) notifAudio.current.play()
// web notification
if (Notification.permission === 'granted') new Notification(`New message from ${msg.fromName || msg.fromId}`, { body: msg.text })
})
s.on('typing', t => setTyping(t))
s.on('reaction', ({ messageId, reactions }) => setMessages(prev=>prev.map(m=>m.id===messageId?{...m,reactions}:m)))
s.on('read', ({ messageId, readBy }) => setMessages(prev=>prev.map(m=>m.id===messageId?{...m,readBy}:m)))
s.on('notification', n => console.log('notification', n))


// Request Notification permission
if (Notification.permission !== 'granted' && Notification.permission !== 'denied') Notification.requestPermission()


return () => s.disconnect()
}, [])


const sendMessage = (text, opts={}) => {
if (!socket) return
const msg = { id: `${user.id}-${Date.now()}`, room, fromId: user.id, fromName: user.name, text, ts: Date.now(), ...opts }
socket.emit('message', msg)
}


const sendTyping = () => socket && socket.emit('typing', { room, fromId: user.id, fromName: user.name })


return (
<div className="app-grid">
<audio ref={notifAudio} src="/notification.mp3" />
<UserList users={users} currentUser={user} />
<div className="chat-column">
<MessageList messages={messages} currentUser={user} onReact={(messageId, reaction)=>socket.emit('reaction', { messageId, reaction, userId: user.id })} />
<MessageInput onSend={sendMessage} onTyping={sendTyping} onFile={(file)=>{/* implement upload */}} />
</div>
</div>
)
}
