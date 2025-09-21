"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Volume2,
  Bot,
  User,
  Languages,
  MessageCircle,
  Lightbulb,
  AlertCircle,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  language?: string
  translation?: string
  pronunciation?: string
}

const conversationStarters = [
  {
    category: "Greetings",
    prompts: ["How do I say hello in Telugu?", "Teach me basic Tamil greetings", "What are common Hindi salutations?"],
  },
  {
    category: "Daily Conversation",
    prompts: [
      "How do I introduce myself in Kannada?",
      "Teach me to ask for directions in Malayalam",
      "Help me order food in Telugu",
    ],
  },
  {
    category: "Grammar Help",
    prompts: ["Explain Tamil verb conjugation", "How do Hindi pronouns work?", "What are Kannada sentence structures?"],
  },
  {
    category: "Cultural Context",
    prompts: [
      "Tell me about Telugu festivals",
      "Explain Tamil cultural traditions",
      "What are important Malayalam phrases for respect?",
    ],
  },
]

export default function ChatPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI language learning assistant for Learn 2 Talk. I can help you practice conversations, explain grammar, provide translations, and share cultural insights about Telugu, Tamil, Kannada, Hindi, and Malayalam. What would you like to learn today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("telugu")
  const [error, setError] = useState<string | null>(null)
  const [speechSupported, setSpeechSupported] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = [
    { id: "telugu", name: "Telugu", nativeName: "తెలుగు" },
    { id: "tamil", name: "Tamil", nativeName: "தமிழ்" },
    { id: "kannada", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { id: "hindi", name: "Hindi", nativeName: "हिन्दी" },
    { id: "malayalam", name: "Malayalam", nativeName: "മലയാളം" },
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setSpeechSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setError(null)

    try {
      const aiResponse = await generateAIResponse(inputMessage, selectedLanguage)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        language: selectedLanguage,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      setError("Sorry, I'm having trouble responding right now. Please try again.")
      console.error("AI response error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (userInput: string, language: string): Promise<string> => {
    const input = userInput.toLowerCase()

    // Greetings
    if (input.includes("hello") || input.includes("hi") || input.includes("namaste")) {
      const greetings = {
        telugu:
          "నమస్కారం (Namaskaram) - This is how you say hello in Telugu! It's used throughout the day and shows respect. You can also say 'వందనాలు' (Vandanalu) for a more formal greeting.",
        tamil:
          "வணக்கம் (Vanakkam) - This is the Tamil greeting! It literally means 'I bow to you' and can be used anytime. For morning, you can say 'காலை வணக்கம்' (Kaalai Vanakkam).",
        kannada:
          "ನಮಸ್ಕಾರ (Namaskara) - This is how you greet in Kannada! You can also say 'ನಮಸ್ತೆ' (Namaste) which is more casual.",
        hindi:
          "नमस्ते (Namaste) - The universal Hindi greeting! It means 'I bow to you' and is appropriate for any time of day. You can also say 'नमस्कार' (Namaskar) for a more formal greeting.",
        malayalam:
          "നമസ്കാരം (Namaskaram) - This is the Malayalam greeting! For a more casual hello, you can say 'ഹലോ' (Hello) or 'വണക്കം' (Vanakkam).",
      }
      return greetings[language as keyof typeof greetings] || "Hello! How can I help you learn today?"
    }

    // Thank you
    if (input.includes("thank you") || input.includes("thanks")) {
      const thanks = {
        telugu:
          "ధన్యవాదాలు (Dhanyavadalu) - This means thank you in Telugu! For a more casual thanks, you can say 'థాంక్స్' (Thanks). The response would be 'పర్వాలేదు' (Parvaaledu) meaning 'you're welcome'.",
        tamil:
          "நன்றி (Nandri) - This is how you say thank you in Tamil! You can also say 'மிக்க நன்றி' (Mikka Nandri) for 'thank you very much'. The response is 'பரவாயில்லை' (Paravaayillai).",
        kannada:
          "ಧನ್ಯವಾದಗಳು (Dhanyavadagalu) - Thank you in Kannada! A shorter version is 'ಧನ್ಯವಾದ' (Dhanyavaada). The response is 'ಪರವಾಗಿಲ್ಲ' (Parvaagilla).",
        hindi:
          "धन्यवाद (Dhanyawad) - Thank you in Hindi! You can also say 'शुक्रिया' (Shukriya) which is more Urdu-influenced. The response is 'कोई बात नहीं' (Koi baat nahin).",
        malayalam:
          "നന്ദി (Nandi) - This means thank you in Malayalam! For emphasis, say 'വളരെ നന്ദി' (Valare Nandi). The response is 'കുഴപ്പമില്ല' (Kuzhappamilla).",
      }
      return thanks[language as keyof typeof thanks] || "You're welcome!"
    }

    // Names and introductions
    if (input.includes("name") || input.includes("introduce")) {
      const introductions = {
        telugu:
          "మీ పేరు ఏమిటి? (Mee peru emiti?) - What is your name?\nనా పేరు... (Naa peru...) - My name is...\nనేను... నుండి వచ్చాను (Nenu... nundi vachchaanu) - I am from...\nExample: నా పేరు రాజ్. నేను హైదరాబాద్ నుండి వచ్చాను (Naa peru Raj. Nenu Hyderabad nundi vachchaanu)",
        tamil:
          "உங்கள் பெயர் என்ன? (Ungal peyar enna?) - What is your name?\nஎன் பெயர்... (En peyar...) - My name is...\nநான்... இல் இருந்து வந்தேன் (Naan... il irundhu vandhen) - I am from...\nExample: என் பெயர் ராஜ். நான் சென்னையில் இருந்து வந்தேன் (En peyar Raj. Naan Chennaiyil irundhu vandhen)",
        kannada:
          "ನಿಮ್ಮ ಹೆಸರು ಏನು? (Nimma hesaru enu?) - What is your name?\nನನ್ನ ಹೆಸರು... (Nanna hesaru...) - My name is...\nನಾನು... ಇಂದ ಬಂದಿದ್ದೇನೆ (Naanu... inda bandiddene) - I am from...\nExample: ನನ್ನ ಹೆಸರು ರಾಜ್. ನಾನು ಬೆಂಗಳೂರಿಂದ ಬಂದಿದ್ದೇನೆ (Nanna hesaru Raj. Naanu Bengaloorinda bandiddene)",
        hindi:
          "आपका नाम क्या है? (Aapka naam kya hai?) - What is your name?\nमेरा नाम... है (Mera naam... hai) - My name is...\nमैं... से हूँ (Main... se hun) - I am from...\nExample: मेरा नाम राज है। मैं दिल्ली से हूँ (Mera naam Raj hai. Main Delhi se hun)",
        malayalam:
          "നിങ്ങളുടെ പേര് എന്താണ്? (Ningalude peru enthaanu?) - What is your name?\nഎന്റെ പേര്... ആണ് (Ente peru... aanu) - My name is...\nഞാൻ... ൽ നിന്നാണ് (Njaan... l ninnaanu) - I am from...\nExample: എന്റെ പേര് രാജ് ആണ്. ഞാൻ കൊച്ചിയിൽ നിന്നാണ് (Ente peru Raj aanu. Njaan Kochiyil ninnaanu)",
      }
      return introductions[language as keyof typeof introductions] || "Let me help you with introductions!"
    }

    // Numbers
    if (input.includes("number") || input.includes("count")) {
      const numbers = {
        telugu:
          "Telugu Numbers (1-10):\n1 - ఒకటి (Okati)\n2 - రెండు (Rendu)\n3 - మూడు (Moodu)\n4 - నాలుగు (Naalugu)\n5 - అయిదు (Ayidu)\n6 - ఆరు (Aaru)\n7 - ఏడు (Edu)\n8 - ఎనిమిది (Enimidi)\n9 - తొమ్మిది (Tommidi)\n10 - పది (Padi)",
        tamil:
          "Tamil Numbers (1-10):\n1 - ஒன்று (Ondru)\n2 - இரண்டு (Irandu)\n3 - மூன்று (Moondru)\n4 - நான்கு (Naangu)\n5 - ஐந்து (Aindhu)\n6 - ஆறு (Aaru)\n7 - ஏழு (Ezhu)\n8 - எட்டு (Ettu)\n9 - ஒன்பது (Onbadhu)\n10 - பத்து (Pathu)",
        kannada:
          "Kannada Numbers (1-10):\n1 - ಒಂದು (Ondu)\n2 - ಎರಡು (Eradu)\n3 - ಮೂರು (Mooru)\n4 - ನಾಲ್ಕು (Naalku)\n5 - ಐದು (Aidu)\n6 - ಆರು (Aaru)\n7 - ಏಳು (Eelu)\n8 - ಎಂಟು (Entu)\n9 - ಒಂಬತ್ತು (Ombattu)\n10 - ಹತ್ತು (Hattu)",
        hindi:
          "Hindi Numbers (1-10):\n1 - एक (Ek)\n2 - दो (Do)\n3 - तीन (Teen)\n4 - चार (Chaar)\n5 - पांच (Paanch)\n6 - छह (Chhah)\n7 - सात (Saat)\n8 - आठ (Aath)\n9 - नौ (Nau)\n10 - दस (Das)",
        malayalam:
          "Malayalam Numbers (1-10):\n1 - ഒന്ന് (Onnu)\n2 - രണ്ട് (Randu)\n3 - മൂന്ന് (Moonnu)\n4 - നാല് (Naalu)\n5 - അഞ്ച് (Anchu)\n6 - ആറ് (Aaru)\n7 - ഏഴ് (Ezhu)\n8 - എട്ട് (Ettu)\n9 - ഒമ്പത് (Ombathu)\n10 - പത്ത് (Pathu)",
      }
      return numbers[language as keyof typeof numbers] || "Let me teach you numbers!"
    }

    // Food
    if (input.includes("food") || input.includes("eat") || input.includes("hungry")) {
      const food = {
        telugu:
          "Telugu Food Vocabulary:\nఅన్నం (Annam) - Rice\nరోటీ (Roti) - Bread\nకూర (Koora) - Curry\nపప్పు (Pappu) - Dal\nనీళ్లు (Neellu) - Water\nపాలు (Paalu) - Milk\n\nUseful phrases:\nనాకు ఆకలిగా ఉంది (Naaku aakaliga undi) - I am hungry\nఇది రుచిగా ఉంది (Idi ruchiga undi) - This is tasty",
        tamil:
          "Tamil Food Vocabulary:\nசாதம் (Saadham) - Rice\nரொட்டி (Rotti) - Bread\nகறி (Kari) - Curry\nபருப்பு (Paruppu) - Dal\nதண்ணீர் (Thanneer) - Water\nபால் (Paal) - Milk\n\nUseful phrases:\nஎனக்கு பசிக்கிறது (Enakku pasikkiradhu) - I am hungry\nஇது சுவையாக இருக்கிறது (Idhu suvaiyaaga irukkirdhu) - This is tasty",
        kannada:
          "Kannada Food Vocabulary:\nಅನ್ನ (Anna) - Rice\nರೊಟ್ಟಿ (Rotti) - Bread\nಕೂರ (Koora) - Curry\nಪಪ್ಪು (Pappu) - Dal\nನೀರು (Neeru) - Water\nಹಾಲು (Haalu) - Milk\n\nUseful phrases:\nನನಗೆ ಹಸಿವಾಗಿದೆ (Nanage hasivaagide) - I am hungry\nಇದು ರುಚಿಯಾಗಿದೆ (Idu ruchiyaagide) - This is tasty",
        hindi:
          "Hindi Food Vocabulary:\nचावल (Chawal) - Rice\nरोटी (Roti) - Bread\nसब्जी (Sabzi) - Curry/Vegetable\nदाल (Daal) - Dal\nपानी (Paani) - Water\nदूध (Doodh) - Milk\n\nUseful phrases:\nमुझे भूख लगी है (Mujhe bhookh lagi hai) - I am hungry\nयह स्वादिष्ट है (Yah swaadisht hai) - This is tasty",
        malayalam:
          "Malayalam Food Vocabulary:\nചോറ് (Choru) - Rice\nചപ്പാത്തി (Chappaathi) - Bread\nകറി (Kari) - Curry\nപരിപ്പ് (Paripp) - Dal\nവെള്ളം (Vellam) - Water\nപാൽ (Paal) - Milk\n\nUseful phrases:\nഎനിക്ക് വിശക്കുന്നു (Enikku vishakkunnu) - I am hungry\nഇത് രുചിയുണ്ട് (Ithu ruchiyundu) - This is tasty",
      }
      return food[language as keyof typeof food] || "Let me teach you about food vocabulary!"
    }

    // Default response with suggestions
    return `Great question about ${languages.find((l) => l.id === language)?.name}! I'd be happy to help you learn more. Here are some topics I can help with:

📚 **Vocabulary**: Numbers, colors, family members, food, days of the week
🗣️ **Phrases**: Greetings, introductions, common expressions
📖 **Grammar**: Sentence structure, verb conjugations, pronouns
🎭 **Culture**: Festivals, traditions, cultural context

Try asking me something like:
• "Teach me Telugu numbers"
• "How do I say family members in Tamil?"
• "What are common Hindi phrases?"
• "Tell me about Kannada grammar"

What would you like to explore?`
  }

  const startListening = () => {
    if (!speechSupported) {
      setError("Speech recognition is not supported in your browser.")
      return
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        setIsListening(false)
        setError(`Speech recognition error: ${event.error}`)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (err) {
      setError("Failed to start speech recognition.")
      setIsListening(false)
    }
  }

  const speakMessage = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setError("Text-to-speech is not supported in your browser.")
      return
    }

    try {
      // Cancel any ongoing speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onerror = () => {
        setError("Failed to speak the message.")
      }

      speechSynthesis.speak(utterance)
    } catch (err) {
      setError("Text-to-speech failed.")
    }
  }

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt)
    setError(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading AI assistant...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Learn 2 Talk AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Practice conversations and get instant help</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1 rounded-md border bg-background text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
            <Button variant="ghost" size="sm" onClick={() => setError(null)} className="ml-auto">
              ×
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversation Starters Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {conversationStarters.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">{category.category}</h4>
                    <div className="space-y-1">
                      {category.prompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptClick(prompt)}
                          className="w-full text-left text-xs p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col bg-background/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span className="font-medium">
                      Learning {languages.find((l) => l.id === selectedLanguage)?.name}
                    </span>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Languages className="h-3 w-3" />
                    {languages.find((l) => l.id === selectedLanguage)?.nativeName}
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              {message.sender === "ai" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                                  onClick={() => speakMessage(message.content)}
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
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={`Ask me anything about ${languages.find((l) => l.id === selectedLanguage)?.name}...`}
                        className="min-h-[60px] pr-12 resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-8 w-8 p-0"
                        onClick={isListening ? () => setIsListening(false) : startListening}
                        disabled={!speechSupported}
                        title={speechSupported ? "Voice input" : "Speech recognition not supported"}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="h-[60px]"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
