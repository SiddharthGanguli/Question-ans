import { useState } from 'react'

export const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  return {
    uploadedFile,
    handleFileUpload,
    removeFile
  }
}
