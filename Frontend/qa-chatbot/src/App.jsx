// src/App.jsx
import { useState } from 'react'
import Navbar   from './components/layout/Navbar'
import Sidebar  from './components/layout/Sidebar'
import Chat     from './components/chat/ChatInterface'
import FileUpload from './components/upload/FileUpload'
import { useChat }        from './hooks/useChat'
import { useFileUpload }  from './hooks/useFileUpload'
import './index.css'

export default function App() {
  const [sidebarOpen,setSidebarOpen]=useState(true)
  const { chats,activeChat,createNewChat,selectChat,closeChat,deleteChat } = useChat()
  const { uploadedFile,handleFileUpload } = useFileUpload()

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50
                    flex flex-col overflow-hidden">
      <Navbar onToggleSidebar={()=>setSidebarOpen(!sidebarOpen)}/>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <Sidebar
            isOpen={sidebarOpen}
            chats={chats}
            activeChat={activeChat}
            onSelectChat={selectChat}
            onNewChat={createNewChat}
            onCloseChat={closeChat}
            onDeleteChat={deleteChat}
          />
        )}

        <div className="flex-1 flex">
          {/* chat */}
          <div className="flex-1">
            <Chat
              uploadedFile={uploadedFile}
              activeChat={activeChat}
              onCloseChat={closeChat}
            />
          </div>

          {/* upload panel */}
          <div className="w-96 hidden xl:block bg-white/80 backdrop-blur-lg
                          border-l border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"/>
              Upload Center
            </h3>
            <FileUpload uploadedFile={uploadedFile} onFileUpload={handleFileUpload}/>
          </div>
        </div>
      </div>
    </div>
  )
}
