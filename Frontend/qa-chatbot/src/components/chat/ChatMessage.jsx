const ChatMessage = ({ message, index }) => {
  return (
    <div
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`
        max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl rounded-3xl px-6 py-4 shadow-lg transform transition-all duration-200 hover:scale-105
        ${message.role === 'user' 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
          : 'bg-white text-gray-800 border border-gray-100'
        }
      `}>
        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
        <p className={`
          text-xs mt-2 flex items-center justify-between
          ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}
        `}>
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {message.role === 'ai' && <span className="text-green-500">✓</span>}
        </p>
      </div>
    </div>
  )
}

export default ChatMessage
