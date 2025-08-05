import { useState } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import AnimatedButton from '../ui/AnimatedButton'

const FileUpload = ({ uploadedFile, onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = (files) => {
    const file = files?.[0]
    if (file && file.size <= 10 * 1024 * 1024) {
      onFileUpload(file)
    } else if (file) {
      alert('File size must be less than 10MB')
    }
  }

  if (uploadedFile) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 animate-in slide-in-from-right-2 duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-green-900">{uploadedFile.name}</p>
              <p className="text-sm text-green-700">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <AnimatedButton
            onClick={() => onFileUpload(null)}
            variant="danger"
            size="sm"
          >
            <X className="h-4 w-4" />
          </AnimatedButton>
        </div>
      </div>
    )
  }

  return (
    <div
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        setDragActive(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={`
        relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 cursor-pointer
        ${dragActive 
          ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 scale-105' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50'
        }
      `}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => handleFiles(e.target.files)}
        accept=".pdf,.jpg,.jpeg,.png,.txt"
      />
      
      <div className="animate-in zoom-in-50 duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Upload className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Document</h3>
        <p className="text-gray-600 mb-4">Drag & drop your file here or click to browse</p>
        <p className="text-sm text-gray-500">Supports PDF, JPG, PNG, TXT (max 10MB)</p>
      </div>
    </div>
  )
}

export default FileUpload
