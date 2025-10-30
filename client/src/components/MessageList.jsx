import React, { useEffect, useRef } from 'react'


export default function MessageList({ messages, currentUser, onReact }){
const bottom = useRef()
useEffect(()=> bottom.current?.scrollIntoView({ behavior: 'smooth' }), [messages])
return (
<div className="message-list">
{messages.map(m=> (
<div key={m.id} classNam
