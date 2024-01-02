import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_USER_TYPING, SOCKET_EVENT_USER_TYPING } from '../services/socket.service'

export function ChatRoom({ user, toy }) {

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(toy._id)
    const [typingUsers, setTypingUsers] = useState([])
    const typingTimeoutRef = useRef(null)


    // const [isBotMode, setIsBotMode] = useState(false)


    // const botTimeoutRef = useRef()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg) //listen to other people msgs
        socketService.on(SOCKET_EVENT_USER_TYPING, onUserTyping)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_USER_TYPING, onUserTyping)
            // botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic) //send topic change onmount and on topic change
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function onUserTyping(userName) {
        // console.log('userName from socket', userName)
        setTypingUsers(prevUsers => {
            if (!prevUsers.includes(userName)) {
                return [...prevUsers, userName]
            } else {
                return prevUsers
            }
        })
        setTimeout(() => {
            setTypingUsers(prevUsers => prevUsers.filter(user => user !== userName))
        }, 3000)
    }

    // function sendBotResponse() {
    //     // Handle case: send single bot response (debounce).
    //     botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
    //     botTimeoutRef.current = setTimeout(() => {
    //         setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
    //     }, 1250)
    // }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = user?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // We add the msg ourself to our own state
        addMsg(newMsg)
        setMsg({ txt: '' })
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        setTypingUsers(prevUsers => prevUsers.filter(userName => userName !== from))
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))

        const userName = user?.fullname || 'Guest'
        socketService.emit(SOCKET_EMIT_USER_TYPING, userName)
    }

    return (
        <section className="chat-room">
            <h2>Lets Chat about {toy.name}</h2>
            {typingUsers.length > 0 && (
                <p>{typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...</p>
            )}

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>
        </section>
    )
}