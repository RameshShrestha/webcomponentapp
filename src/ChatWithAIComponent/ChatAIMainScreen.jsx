import { useState, useRef, useEffect } from 'react';
import { Button, Input, Icon, Select, Option, MessageStrip, BusyIndicator, SegmentedButton, SegmentedButtonItem } from '@ui5/webcomponents-react';
import { getDataProvider } from '../Data/ContextHandler/constant';
import './ChatAIMainScreen.css';

const ChatAIMainScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedService, setSelectedService] = useState('ollama'); // 'ollama' or 'openrouter'
  const [selectedModel, setSelectedModel] = useState('llama3.2:1b');
  const [availableModels, setAvailableModels] = useState({
    ollama: [],
    openrouter: []
  });
  const [serviceStatus, setServiceStatus] = useState({
    ollama: { available: false },
    openrouter: { available: false }
  });
  const [error, setError] = useState('');
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const baseURL = getDataProvider();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch available models on component mount
  useEffect(() => {
    fetchModels();
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await fetch(`${baseURL}/chatwithai/health`);
      const data = await response.json();
      
      if (data.services) {
        setServiceStatus(data.services);
        
        // Set error if no services are available
        if (!data.services.ollama.available && !data.services.openrouter.available) {
          setError('No AI services are available. Please check your configuration.');
        } else if (selectedService === 'ollama' && !data.services.ollama.available) {
          setError('Ollama is not running. Please start Ollama or switch to OpenRouter.');
        } else if (selectedService === 'openrouter' && !data.services.openrouter.available) {
          setError('OpenRouter is not accessible. Please check your API key or switch to Ollama.');
        }
      }
    } catch (err) {
      setError('Cannot connect to AI service. Please check your backend server.');
    }
  };

  const fetchModels = async () => {
    setIsLoadingModels(true);
    try {
      const response = await fetch(`${baseURL}/chatwithai/models`);
      const data = await response.json();
      
      if (data.success && data.services) {
        const models = {
          ollama: data.services.ollama?.models || [],
          openrouter: data.services.openrouter?.models || []
        };
        setAvailableModels(models);
        
        // Set default model based on selected service
        if (selectedService === 'ollama' && data.services.ollama?.defaultModel) {
          setSelectedModel(data.services.ollama.defaultModel);
        } else if (selectedService === 'openrouter' && data.services.openrouter?.defaultModel) {
          setSelectedModel(data.services.openrouter.defaultModel);
        }
      }
    } catch (err) {
      console.error('Failed to fetch models:', err);
      setAvailableModels({
        ollama: [{ id: 'llama3.2:1b' }],
        openrouter: [{ id: 'meta-llama/llama-3.2-3b-instruct:free' }]
      });
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    // Check if selected service is available
    if (!serviceStatus[selectedService]?.available) {
      setError(`${selectedService === 'ollama' ? 'Ollama' : 'OpenRouter'} is not available. Please check the service or switch to another one.`);
      return;
    }

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setError('');
    setIsStreaming(true);

    // Create assistant message placeholder
    const assistantMessageId = Date.now();
    const assistantMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      isStreaming: true
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(`${baseURL}/chatwithai/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          model: selectedModel,
          service: selectedService,
          conversationHistory
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.error) {
                setError(data.error);
                break;
              }

              if (data.content) {
                accumulatedContent += data.content;
                
                // Update the assistant message with accumulated content
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                ));
              }

              if (data.done) {
                // Mark streaming as complete
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId
                    ? { ...msg, isStreaming: false }
                    : msg
                ));
                break;
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError);
            }
          }
        }
      }

    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request cancelled');
      } else {
        setError(`Failed to get response: ${err.message}`);
        console.error('Stream error:', err);
      }
      
      // Remove the incomplete assistant message
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      setError('');
    }
  };

  const handleServiceChange = (e) => {
    const newService = e.detail.selectedItems[0].dataset.service;
    setSelectedService(newService);
    
    // Update model to default for the new service
    const models = availableModels[newService];
    if (models && models.length > 0) {
      setSelectedModel(models[0].id);
    }
    
    // Check health for the new service
    checkHealth();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get current service models
  const currentModels = availableModels[selectedService] || [];

  return (
    <div className="chat-ai-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="header-title">
            <Icon name="discussion" className="header-icon" />
            <h1>Chat with AI</h1>
          </div>
          <p className="header-subtitle">
            Service: {selectedService === 'ollama' ? 'Ollama (Local)' : 'OpenRouter (Cloud)'} • Model: {selectedModel} • {messages.length} messages
          </p>
        </div>
        <div className="header-actions">
          <SegmentedButton
            onSelectionChange={handleServiceChange}
            style={{ marginRight: '10px' }}
          >
            <SegmentedButtonItem
              data-service="ollama"
              pressed={selectedService === 'ollama'}
              disabled={isStreaming}
            >
              Ollama {!serviceStatus.ollama?.available && '⚠️'}
            </SegmentedButtonItem>
            <SegmentedButtonItem
              data-service="openrouter"
              pressed={selectedService === 'openrouter'}
              disabled={isStreaming}
            >
              OpenRouter {!serviceStatus.openrouter?.available && '⚠️'}
            </SegmentedButtonItem>
          </SegmentedButton>
          <Select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.detail.selectedOption.textContent)}
            disabled={isStreaming || isLoadingModels}
            className="model-select"
          >
            {currentModels.length > 0 ? (
              currentModels.map(model => (
                <Option key={model.id}>{model.id}</Option>
              ))
            ) : (
              <Option>{selectedService === 'ollama' ? 'llama3.2:1b' : 'meta-llama/llama-3.2-3b-instruct:free'}</Option>
            )}
          </Select>
          <Button
            icon="refresh"
            design="Transparent"
            onClick={fetchModels}
            disabled={isLoadingModels}
            tooltip="Refresh Models"
          />
          <Button
            icon="delete"
            design="Transparent"
            onClick={handleClearChat}
            disabled={messages.length === 0 || isStreaming}
            tooltip="Clear Chat"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <MessageStrip
          design="Negative"
          onClose={() => setError('')}
          className="error-strip"
        >
          {error}
        </MessageStrip>
      )}

      {/* Messages Container */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <Icon name="discussion" className="empty-icon" />
            <h2>Start a conversation</h2>
            <p>Ask me anything! I'm here to help.</p>
            <div className="suggestion-chips">
              <Button
                design="Transparent"
                onClick={() => setInputMessage("Explain quantum computing in simple terms")}
              >
                Explain quantum computing
              </Button>
              <Button
                design="Transparent"
                onClick={() => setInputMessage("Write a Python function to sort a list")}
              >
                Write Python code
              </Button>
              <Button
                design="Transparent"
                onClick={() => setInputMessage("What are the best practices for React development?")}
              >
                React best practices
              </Button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-avatar">
                  <Icon
                    name={message.role === 'user' ? 'person-placeholder' : 'lightbulb'}
                    className="avatar-icon"
                  />
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-role">
                      {message.role === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                  <div
                    className="message-text"
                    dangerouslySetInnerHTML={{
                      __html: message.content + (message.isStreaming ? '<span class="streaming-cursor">▊</span>' : '')
                    }}
                  />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <Input
            value={inputMessage}
            onInput={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isStreaming ? "AI is responding..." : "Type your message..."}
            disabled={isStreaming}
            className="message-input"
          />
          {isStreaming ? (
            <Button
              icon="stop"
              design="Negative"
              onClick={handleStopStreaming}
              className="send-button"
            >
              Stop
            </Button>
          ) : (
            <Button
              icon="paper-plane"
              design="Emphasized"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="send-button"
            >
              Send
            </Button>
          )}
        </div>
        <div className="input-hint">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatAIMainScreen;

// Made with Bob
