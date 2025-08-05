const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colors = {
    blue: 'border-blue-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600'
  }

  return (
    <div className={`
      ${sizes[size]} 
      border-2 ${colors[color]} border-t-transparent 
      rounded-full animate-spin
    `} />
  )
}

export default LoadingSpinner
