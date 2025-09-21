"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Mic, MicOff, Volume2, Bot, User } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  language?: string
}

const conversationStarters = [
  "How do I say 'hello' in Telugu?",
  "Teach me basic Kannada greetings",
  "What's the difference between Tamil and Malayalam?",
  "Help me practice Hindi pronunciation",
  "Tell me about South Indian culture",
]

export default function ChatPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI language learning assistant. I can help you learn Telugu, Kannada, Tamil, Hindi, and Malayalam. What would you like to learn today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "telugu", name: "Telugu", flag: "🇮🇳" },
    { code: "kannada", name: "Kannada", flag: "🇮🇳" },
    { code: "tamil", name: "Tamil", flag: "🇮🇳" },
    { code: "hindi", name: "Hindi", flag: "🇮🇳" },
    { code: "malayalam", name: "Malayalam", flag: "🇮🇳" },
  ]

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response - in real implementation, this would call Google Gemini API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("greet")) {
      if (lowerMessage.includes("telugu")) {
        return "In Telugu, you say 'నమస్కారం' (Namaskaram) for hello. It's used for both greeting and saying goodbye. The pronunciation is 'Na-mas-ka-ram'. Would you like to practice more Telugu greetings?"
      } else if (lowerMessage.includes("kannada")) {
        return "In Kannada, you say 'ನಮಸ್ಕಾರ' (Namaskara) for hello. It's a respectful greeting used throughout the day. Try saying 'Na-mas-ka-ra'. Would you like to learn more Kannada phrases?"
      } else if (lowerMessage.includes("tamil")) {
        return "In Tamil, you say 'வணக்கம்' (Vanakkam) for hello. It's a traditional greeting that shows respect. The pronunciation is 'Va-nak-kam'. Shall we practice more Tamil expressions?"
      } else if (lowerMessage.includes("hindi")) {
        return "In Hindi, you say 'नमस्ते' (Namaste) for hello. It's accompanied by joining palms together. Pronunciation: 'Na-mas-te'. Want to learn more Hindi greetings?"
      } else if (lowerMessage.includes("malayalam")) {
        return "In Malayalam, you say 'നമസ്കാരം' (Namaskaram) for hello. It's similar to Telugu but with slight pronunciation differences. Say 'Na-mas-ka-ram'. Ready for more Malayalam lessons?"
      }
    }

    if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
      return "Here's how to say 'thank you' in different languages:\n• Telugu: ధన్యవాదాలు (Dhanyavadalu)\n• Kannada: ಧನ್ಯವಾದ (Dhanyavada)\n• Tamil: நன்றி (Nandri)\n• Hindi: धन्यवाद (Dhanyavad)\n• Malayalam: നന്ദി (Nandi)\n\nWhich one would you like to practice?"
    }

    if (lowerMessage.includes("culture") || lowerMessage.includes("cultural")) {
      return "South Indian culture is incredibly rich and diverse! Each state has unique traditions:\n\n• Telugu culture features classical dance forms like Kuchipudi\n• Kannada culture is known for its literature and Mysore traditions\n• Tamil culture has ancient poetry and classical music\n• Malayalam culture includes Kathakali dance and Ayurveda\n\nWhich cultural aspect interests you most?"
    }

    if (lowerMessage.includes("number") || lowerMessage.includes("count")) {
      return "Let me teach you numbers 1-5 in Telugu:\n• 1: ఒకటి (Okati)\n• 2: రెండు (Rendu)\n• 3: మూడు (Moodu)\n• 4: నాలుగు (Nalugu)\n• 5: అయిదు (Ayidu)\n\nTry repeating these! Would you like numbers in other languages too?"
    }

    return "That's a great question! I can help you with vocabulary, pronunciation, grammar, and cultural insights for Telugu, Kannada, Tamil, Hindi, and Malayalam. Try asking me about specific words, phrases, or cultural topics. What would you like to explore?"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleStarterClick = (starter: string) => {
    setInputMessage(starter)
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert("Speech recognition is not supported in your browser.")
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Language Assistant</h1>
              <p className="text-gray-600">Practice with your personal language tutor</p>
            </div>
          </div>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang.code)}
              >
                {lang.flag} {lang.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Conversation Starters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversationStarters.map((starter, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-2 text-wrap"
                    onClick={() => handleStarterClick(starter)}
                  >
                    {starter}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  Chat with AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "bg-blue-500" : "bg-gray-500"}`}
                          >
                            {message.type === "user" ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`rounded-lg p-3 ${message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"}`}
                          >
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                              {message.type === "ai" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                                  onClick={() => speakText(message.content)}
                                >
                                  <Volume2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask me anything about languages..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={isLoading}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={startListening}
                        disabled={isLoading || isListening}
                      >
                        {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {selectedLanguage && (
                    <div className="mt-2">
                      <Badge variant="outline">
                        Learning: {languages.find((l) => l.code === selectedLanguage)?.name}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
