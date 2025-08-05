const API_BASE_URL = 'http://localhost:8000'

export const chatWithLLM = async (prompt, useContext = true) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        prompt,
        use_context: useContext 
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data.answer
  } catch (error) {
    console.error('API Error:', error)
    throw new Error(`Failed to get response: ${error.message}`)
  }
}

export const uploadFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Upload Error:', error)
    throw error
  }
}

export const clearContext = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/clear-context`, {
      method: 'POST'
    })
    
    if (!response.ok) {
      throw new Error(`Clear context failed: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Clear Context Error:', error)
    throw error
  }
}

export const getStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/status`)
    
    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Status Error:', error)
    throw error
  }
}
