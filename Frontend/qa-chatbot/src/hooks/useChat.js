// src/hooks/useChat.js
import { useState } from 'react'

export const useChat = () => {
  const [chats, setChats] = useState([
    { id: 1, title: 'Document Analysis', timestamp: '2 min ago', active: true },
    { id: 2, title: 'General Questions',  timestamp: '1 hour ago', active: false },
    { id: 3, title: 'File Processing',    timestamp: '3 hours ago', active: false }
  ])
  const [activeChat, setActiveChat] = useState(chats[0])

  /* ---------- helpers ---------- */
  const stamp = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const createNewChat = () => {
    const fresh = {
      id: Date.now(),
      title: `New Chat ${chats.length + 1}`,
      timestamp: stamp(),
      active: true
    }
    setChats([fresh, ...chats.map(c => ({ ...c, active: false }))])
    setActiveChat(fresh)
  }

  const selectChat = (chat) => {
    setChats(chats.map(c => ({ ...c, active: c.id === chat.id })))
    setActiveChat(chat)
  }

  /* ----- CLOSE CHAT LOGIC ----- */
  const closeChat = (chatId) => {
    const closing   = chats.find(c => c.id === chatId)
    const remaining = chats.filter(c => c.id !== chatId)

    // if last chat → spawn a new one instead of leaving UI empty
    if (!remaining.length) {
      createNewChat()
      return
    }

    // mark first remaining as active when the active chat is closed
    const nextActive = closing.active ? remaining[0] : activeChat
    setChats(
      remaining.map(c => ({ ...c, active: c.id === nextActive.id }))
    )
    setActiveChat(nextActive)
  }

  const deleteChat = closeChat        // currently same behaviour

  return { chats, activeChat, createNewChat, selectChat, closeChat, deleteChat }
}
