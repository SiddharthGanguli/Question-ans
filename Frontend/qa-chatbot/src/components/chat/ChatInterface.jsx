import { useState, useRef, useEffect } from 'react'
import { Send, X, MoreVertical, RefreshCw, Upload } from 'lucide-react'
import AnimatedButton from '../ui/AnimatedButton'
import ChatMessage from './ChatMessage'
import { chatWithLLM, uploadFile, clearContext, getStatus } from '../../utils/api'

const ChatInterface = ({ activeChat, onCloseChat }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'ai', 
      text: '👋 Hello! I\'m your local AI assistant powered by Llama 3.2. I can help answer questions and analyze documents you upload. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Check API status on component mount
    checkStatus()
  }, [])

  const checkStatus = async () => {
    try {
      await getStatus()
      setIsConnected(true)
    } catch (error) {
      setIsConnected(false)
      console.error('Failed to connect to LLM service:', error)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || !isConnected) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const answer = await chatWithLLM(userMessage.text, true)
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        text: answer,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 2,
        role: 'ai',
        text: `❌ Sorry, I encountered an error: ${error.message}. Please make sure the LLM service is running.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      const result = await uploadFile(file)
      setUploadedFile(file)
      
      const uploadMessage = {
        id: Date.now(),
        role: 'ai',
        text: `📁 File "${file.name}" uploaded successfully! I can now reference this document in our conversation. Feel free to ask questions about it.`,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, uploadMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        role: 'ai',
        text: `❌ Failed to upload file: ${error.message}`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleClearContext = async () => {
    try {
      await clearContext()
      setUploadedFile(null)
      setMessages([{
        id: Date.now(),
        role: 'ai',
        text: '🔄 Conversation context has been cleared. How can I help you with a fresh start?',
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('Failed to clear context:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{activeChat?.title || 'Local AI Assistant'}</h3>
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                  {isConnected ? 'Connected to Llama 3.2' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
              title="Upload file"
            >
              <Upload className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={handleClearContext}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
              title="Clear conversation"
            >
              <RefreshCw className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => onCloseChat(activeChat.id)}
              className="p-2 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-xl transition-all duration-200 hover:scale-110"
              title="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {uploadedFile && (
          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              📄 Context: <span className="font-medium">{uploadedFile.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            index={index} 
          />
        ))}

        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-3xl px-6 py-4 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur-lg border-t border-gray-200">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Ask me anything..." : "Connecting to AI service..."}
              disabled={!isConnected}
              rows="1"
              className="w-full px-6 py-4 pr-16 bg-white border border-gray-200 rounded-3xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 resize-none max-h-32 transition-all duration-200 shadow-sm disabled:opacity-50"
            />
          </div>
          
          <AnimatedButton
            onClick={sendMessage}
            disabled={!input.trim() || !isConnected}
            className="p-4 rounded-full shadow-lg"
            size="lg"
          >
            <Send className="h-5 w-5" />
          </AnimatedButton>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        accept=".txt,.pdf,.md,.json"
      />
    </div>
  )
}

export default ChatInterface
