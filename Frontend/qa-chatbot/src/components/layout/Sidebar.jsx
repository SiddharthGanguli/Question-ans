// src/components/layout/Sidebar.jsx
import { Plus, MessageCircle, FileText, MoreVertical, X, Trash2 }
  from 'lucide-react'
import { useState } from 'react'
import AnimatedButton from '../ui/AnimatedButton'

const Sidebar = ({
  isOpen, chats, activeChat,
  onSelectChat, onNewChat, onCloseChat, onDeleteChat
}) => {
  const [menu, setMenu] = useState(null)

  const clickClose  = (e, id) => { e.stopPropagation(); onCloseChat(id)  }
  const clickDelete = (e, id) => { e.stopPropagation(); onDeleteChat(id) }

  return (
    <div className={`
      w-80 bg-gradient-to-b from-slate-50 to-white border-r border-gray-200
      flex flex-col shadow-lg transition duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Conversations</h2>
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"/>
        </div>

        <AnimatedButton
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2"
          size="lg"
        >
          <Plus className="h-5 w-5"/> <span>New Chat</span>
        </AnimatedButton>
      </div>

      {/* chat list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chats.map((chat, i) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`
              group p-4 rounded-2xl cursor-pointer transition transform
              ${chat.active
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white hover:bg-gray-50 border border-gray-100 hover:shadow-md'}
              animate-in slide-in-from-left-4
            `}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0
                ${chat.active
                  ? 'bg-white/20 text-white'
                  : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'}
              `}>
                <MessageCircle className="h-5 w-5"/>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-sm truncate
                    ${chat.active ? 'text-white' : 'text-gray-900'}`}>
                  {chat.title}
                </h3>
                <p className={`text-xs
                    ${chat.active ? 'text-white/80' : 'text-gray-500'}`}>
                  {chat.timestamp}
                </p>
              </div>

              {/* quick close */}
              <button
                onClick={(e)=>clickClose(e,chat.id)}
                title="Close"
                className={`
                  opacity-0 group-hover:opacity-100 p-1 rounded-lg
                  transition hover:scale-110
                  ${chat.active
                    ? 'text-white hover:bg-white/20'
                    : 'text-gray-500 hover:bg-gray-200'}
                `}
              >
                <X className="h-4 w-4"/>
              </button>

              {/* menu */}
              <div className="relative">
                <button
                  onClick={(e)=>{e.stopPropagation(); setMenu(menu===chat.id?null:chat.id)}}
                  className={`
                    opacity-0 group-hover:opacity-100 p-1 rounded-lg transition
                    ${chat.active
                      ? 'text-white hover:bg-white/20'
                      : 'text-gray-500 hover:bg-gray-200'}
                  `}
                >
                  <MoreVertical className="h-4 w-4"/>
                </button>

                {menu===chat.id && (
                  <div
                    className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg
                               border border-gray-200 py-2 z-10"
                  >
                    <button
                      onClick={(e)=>clickClose(e,chat.id)}
                      className="flex items-center w-full px-4 py-2 text-sm
                                 text-gray-700 hover:bg-gray-50"
                    >
                      <X className="h-4 w-4 mr-2"/> Close Chat
                    </button>
                    <hr/>
                    <button
                      onClick={(e)=>clickDelete(e,chat.id)}
                      className="flex items-center w-full px-4 py-2 text-sm
                                 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2"/> Delete Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 p-3
                           text-gray-600 hover:bg-gray-100 rounded-xl">
          <FileText className="h-5 w-5"/> <span className="text-sm">My Documents</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
