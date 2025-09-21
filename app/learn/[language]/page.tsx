"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Volume2,
  Mic,
  MicOff,
  CheckCircle,
  XCircle,
  RotateCcw,
  MessageCircle,
  BookOpen,
  Star,
  Brain,
  PenTool,
  Headphones,
  Trophy,
} from "lucide-react"

const languageData = {
  telugu: {
    name: "Telugu",
    nativeName: "తెలుగు",
    color: "from-blue-500 to-blue-600",
    lessons: [
      {
        id: 1,
        title: "Basic Greetings",
        type: "vocabulary",
        description: "Learn essential Telugu greetings",
        words: [
          { telugu: "నమస్కారం", english: "Hello/Goodbye", pronunciation: "Namaskaram" },
          { telugu: "ధన్యవాదాలు", english: "Thank you", pronunciation: "Dhanyavadalu" },
          { telugu: "క్షమించండి", english: "Sorry/Excuse me", pronunciation: "Kshaminchandhi" },
          { telugu: "మీ పేరు ఏమిటి?", english: "What is your name?", pronunciation: "Mee peru emiti?" },
        ],
      },
      {
        id: 2,
        title: "Numbers 1-10",
        type: "vocabulary",
        description: "Learn Telugu numbers",
        words: [
          { telugu: "ఒకటి", english: "One", pronunciation: "Okati" },
          { telugu: "రెండు", english: "Two", pronunciation: "Rendu" },
          { telugu: "మూడు", english: "Three", pronunciation: "Moodu" },
          { telugu: "నాలుగు", english: "Four", pronunciation: "Naalugu" },
          { telugu: "అయిదు", english: "Five", pronunciation: "Ayidu" },
        ],
      },
      {
        id: 3,
        title: "Grammar: Present Tense",
        type: "grammar",
        description: "Learn present tense verb conjugations",
        content: {
          explanation:
            "In Telugu, verbs change based on the subject. The present tense is formed by adding specific endings.",
          examples: [
            { telugu: "నేను తింటున్నాను", english: "I am eating", breakdown: "నేను (I) + తింటున్నాను (am eating)" },
            {
              telugu: "మీరు చదువుతున్నారు",
              english: "You are reading",
              breakdown: "మీరు (You) + చదువుతున్నారు (are reading)",
            },
          ],
        },
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Greetings Quiz",
        questions: [
          {
            question: "How do you say 'Hello' in Telugu?",
            options: ["నమస్కారం", "ధన్యవాదాలు", "క్షమించండి", "మీ పేరు ఏమిటి?"],
            correct: 0,
            explanation: "నమస్కారం (Namaskaram) is the common greeting in Telugu.",
          },
          {
            question: "What does 'ధన్యవాదాలు' mean?",
            options: ["Hello", "Sorry", "Thank you", "Goodbye"],
            correct: 2,
            explanation: "ధన్యవాదాలు (Dhanyavadalu) means 'Thank you' in Telugu.",
          },
        ],
      },
    ],
  },
  kannada: {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    color: "from-red-500 to-red-600",
    lessons: [
      {
        id: 1,
        title: "Basic Greetings",
        type: "vocabulary",
        description: "Learn essential Kannada greetings",
        words: [
          { kannada: "ನಮಸ್ಕಾರ", english: "Hello/Goodbye", pronunciation: "Namaskara" },
          { kannada: "ಧನ್ಯವಾದಗಳು", english: "Thank you", pronunciation: "Dhanyavadagalu" },
          { kannada: "ಕ್ಷಮಿಸಿ", english: "Sorry", pronunciation: "Kshemisi" },
          { kannada: "ನಿಮ್ಮ ಹೆಸರು ಏನು?", english: "What is your name?", pronunciation: "Nimma hesaru enu?" },
        ],
      },
      {
        id: 2,
        title: "Family Members",
        type: "vocabulary",
        description: "Learn family relationship terms",
        words: [
          { kannada: "ಅಪ್ಪ", english: "Father", pronunciation: "Appa" },
          { kannada: "ಅಮ್ಮ", english: "Mother", pronunciation: "Amma" },
          { kannada: "ಅಣ್ಣ", english: "Elder brother", pronunciation: "Anna" },
          { kannada: "ಅಕ್ಕ", english: "Elder sister", pronunciation: "Akka" },
        ],
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Basic Greetings Quiz",
        questions: [
          {
            question: "How do you say 'Thank you' in Kannada?",
            options: ["ನಮಸ್ಕಾರ", "ಧನ್ಯವಾದಗಳು", "ಕ್ಷಮಿಸಿ", "ಹೆಸರು"],
            correct: 1,
            explanation: "ಧನ್ಯವಾದಗಳು (Dhanyavadagalu) means 'Thank you' in Kannada.",
          },
        ],
      },
    ],
  },
  tamil: {
    name: "Tamil",
    nativeName: "தமிழ்",
    color: "from-green-500 to-green-600",
    lessons: [
      {
        id: 1,
        title: "Basic Greetings",
        type: "vocabulary",
        description: "Learn essential Tamil greetings",
        words: [
          { tamil: "வணக்கம்", english: "Hello/Goodbye", pronunciation: "Vanakkam" },
          { tamil: "நன்றி", english: "Thank you", pronunciation: "Nandri" },
          { tamil: "மன்னிக்கவும்", english: "Sorry", pronunciation: "Mannikkavum" },
          { tamil: "உங்கள் பெயர் என்ன?", english: "What is your name?", pronunciation: "Ungal peyar enna?" },
        ],
      },
      {
        id: 2,
        title: "Colors",
        type: "vocabulary",
        description: "Learn basic colors in Tamil",
        words: [
          { tamil: "சிவப்பு", english: "Red", pronunciation: "Sivappu" },
          { tamil: "நீலம்", english: "Blue", pronunciation: "Neelam" },
          { tamil: "பச்சை", english: "Green", pronunciation: "Pachai" },
          { tamil: "மஞ்சள்", english: "Yellow", pronunciation: "Manjal" },
        ],
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Greetings and Colors",
        questions: [
          {
            question: "What color is 'சிவப்பு'?",
            options: ["Blue", "Green", "Red", "Yellow"],
            correct: 2,
            explanation: "சிவப்பு (Sivappu) means 'Red' in Tamil.",
          },
        ],
      },
    ],
  },
  hindi: {
    name: "Hindi",
    nativeName: "हिन्दी",
    color: "from-orange-500 to-orange-600",
    lessons: [
      {
        id: 1,
        title: "Basic Greetings",
        type: "vocabulary",
        description: "Learn essential Hindi greetings",
        words: [
          { hindi: "नमस्ते", english: "Hello/Goodbye", pronunciation: "Namaste" },
          { hindi: "धन्यवाद", english: "Thank you", pronunciation: "Dhanyawad" },
          { hindi: "माफ़ करें", english: "Sorry", pronunciation: "Maaf karen" },
          { hindi: "आपका नाम क्या है?", english: "What is your name?", pronunciation: "Aapka naam kya hai?" },
        ],
      },
      {
        id: 2,
        title: "Days of the Week",
        type: "vocabulary",
        description: "Learn days in Hindi",
        words: [
          { hindi: "सोमवार", english: "Monday", pronunciation: "Somwar" },
          { hindi: "मंगलवार", english: "Tuesday", pronunciation: "Mangalwar" },
          { hindi: "बुधवार", english: "Wednesday", pronunciation: "Budhwar" },
          { hindi: "गुरुवार", english: "Thursday", pronunciation: "Guruwar" },
        ],
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Basic Hindi Quiz",
        questions: [
          {
            question: "What day is 'सोमवार'?",
            options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
            correct: 1,
            explanation: "सोमवार (Somwar) means 'Monday' in Hindi.",
          },
        ],
      },
    ],
  },
  malayalam: {
    name: "Malayalam",
    nativeName: "മലയാളം",
    color: "from-purple-500 to-purple-600",
    lessons: [
      {
        id: 1,
        title: "Basic Greetings",
        type: "vocabulary",
        description: "Learn essential Malayalam greetings",
        words: [
          { malayalam: "നമസ്കാരം", english: "Hello/Goodbye", pronunciation: "Namaskaram" },
          { malayalam: "നന്ദി", english: "Thank you", pronunciation: "Nandi" },
          { malayalam: "ക്ഷമിക്കണം", english: "Sorry", pronunciation: "Kshemikkanam" },
          { malayalam: "നിങ്ങളുടെ പേര് എന്താണ്?", english: "What is your name?", pronunciation: "Ningalude peru enthaanu?" },
        ],
      },
      {
        id: 2,
        title: "Food Items",
        type: "vocabulary",
        description: "Learn common food names",
        words: [
          { malayalam: "ചോറ്", english: "Rice", pronunciation: "Choru" },
          { malayalam: "മീൻ", english: "Fish", pronunciation: "Meen" },
          { malayalam: "പാൽ", english: "Milk", pronunciation: "Paal" },
          { malayalam: "വെള്ളം", english: "Water", pronunciation: "Vellam" },
        ],
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Food and Greetings",
        questions: [
          {
            question: "What is 'ചോറ്' in English?",
            options: ["Fish", "Rice", "Milk", "Water"],
            correct: 1,
            explanation: "ചോറ് (Choru) means 'Rice' in Malayalam.",
          },
        ],
      },
    ],
  },
}

export default function LearnPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const language = params.language as string

  const [activeTab, setActiveTab] = useState("lessons")
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const [isListening, setIsListening] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [lessonProgress, setLessonProgress] = useState(0)
  const [completedWords, setCompletedWords] = useState<number[]>([])

  const currentLanguage = languageData[language as keyof typeof languageData]
  const currentLesson = currentLanguage?.lessons[currentLessonIndex]
  const currentWord = currentLesson?.words?.[currentWordIndex]
  const currentQuiz = currentLanguage?.quizzes?.[currentQuizIndex]
  const currentQuestion = currentQuiz?.questions?.[currentQuestionIndex]

  useEffect(() => {
    if (!currentLanguage) {
      router.push("/dashboard")
    }
  }, [currentLanguage, router])

  useEffect(() => {
    if (currentLesson) {
      const progress = (completedWords.length / currentLesson.words.length) * 100
      setLessonProgress(progress)
    }
  }, [completedWords, currentLesson])

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "hindi" ? "hi-IN" : "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setUserAnswer(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    }
  }

  const checkAnswer = () => {
    if (!currentWord) return

    const correctAnswer = currentWord.english.toLowerCase()
    const userAnswerLower = userAnswer.toLowerCase()

    if (userAnswerLower.includes(correctAnswer) || correctAnswer.includes(userAnswerLower)) {
      setScore(score + 10)
      setCompletedWords([...completedWords, currentWordIndex])
    }
    setShowAnswer(true)
  }

  const nextWord = () => {
    if (!currentLesson) return

    if (currentWordIndex < currentLesson.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setUserAnswer("")
      setShowAnswer(false)
    } else {
      // Lesson completed
      router.push("/dashboard")
    }
  }

  const resetWord = () => {
    setUserAnswer("")
    setShowAnswer(false)
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const submitQuizAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return

    if (selectedAnswer === currentQuestion.correct) {
      setQuizScore(quizScore + 10)
    }
    setShowQuizResult(true)
  }

  const nextQuestion = () => {
    if (!currentQuiz) return

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowQuizResult(false)
    } else {
      // Quiz completed
      setActiveTab("lessons")
      setCurrentQuizIndex(0)
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowQuizResult(false)
    }
  }

  if (loading || !currentLanguage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading lesson...</p>
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
            <div>
              <h1 className="text-xl font-bold">{currentLanguage.name} Learning</h1>
              <p className="text-sm text-muted-foreground">Master {currentLanguage.nativeName} step by step</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10">
              <Star className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold">{score + quizScore} XP</span>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <MessageCircle className="h-4 w-4" />
              AI Help
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="lessons" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <Headphones className="h-4 w-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <Trophy className="h-4 w-4" />
              Quiz
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentLanguage.lessons.map((lesson, index) => (
                <Card
                  key={lesson.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    index === currentLessonIndex ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => {
                    setCurrentLessonIndex(index)
                    setActiveTab("practice")
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={lesson.type === "vocabulary" ? "default" : "secondary"}>
                        {lesson.type === "vocabulary" ? "Vocabulary" : "Grammar"}
                      </Badge>
                      {lesson.type === "vocabulary" ? (
                        <PenTool className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Brain className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{lesson.words?.length || 0} items</span>
                      <span>Beginner</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            {currentLesson?.type === "vocabulary" ? (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Lesson Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {currentWordIndex + 1} of {currentLesson?.words?.length || 0}
                    </span>
                  </div>
                  <Progress value={lessonProgress} className="h-3" />
                </div>

                {/* Learning Card - existing vocabulary practice */}
                <div className="max-w-2xl mx-auto">
                  <Card className="mb-6">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentLanguage.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                      >
                        {currentWordIndex + 1}
                      </div>
                      <CardTitle className="text-3xl mb-2">{currentWord && Object.values(currentWord)[0]}</CardTitle>
                      <CardDescription className="text-lg">
                        Pronunciation: <span className="font-semibold">{currentWord?.pronunciation}</span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Audio Controls */}
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          size="lg"
                          className="gap-2 bg-transparent"
                          onClick={() => currentWord && speakText(currentWord.pronunciation)}
                        >
                          <Volume2 className="h-5 w-5" />
                          Listen
                        </Button>
                      </div>

                      {/* Speech Recognition */}
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-3">Say the English translation:</p>
                          <Button
                            variant={isListening ? "destructive" : "secondary"}
                            size="lg"
                            className="gap-2"
                            onClick={isListening ? () => setIsListening(false) : startListening}
                          >
                            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            {isListening ? "Stop Listening" : "Start Speaking"}
                          </Button>
                        </div>

                        {userAnswer && (
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">You said:</p>
                            <p className="text-lg font-semibold">{userAnswer}</p>
                          </div>
                        )}
                      </div>

                      {/* Answer Section */}
                      {showAnswer && currentWord && (
                        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-center gap-2">
                            {userAnswer.toLowerCase().includes(currentWord.english.toLowerCase()) ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-green-600 font-semibold">Correct!</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-5 w-5 text-red-500" />
                                <span className="text-red-600 font-semibold">Try again!</span>
                              </>
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Correct answer:</p>
                            <p className="text-xl font-bold">{currentWord.english}</p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 justify-center">
                        {!showAnswer ? (
                          <>
                            <Button variant="outline" onClick={resetWord} className="gap-2 bg-transparent">
                              <RotateCcw className="h-4 w-4" />
                              Reset
                            </Button>
                            <Button onClick={checkAnswer} disabled={!userAnswer} className="gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Check Answer
                            </Button>
                          </>
                        ) : (
                          <Button onClick={nextWord} className="gap-2">
                            {currentWordIndex < (currentLesson?.words?.length || 0) - 1
                              ? "Next Word"
                              : "Complete Lesson"}
                            <ArrowLeft className="h-4 w-4 rotate-180" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      {currentLesson?.title}
                    </CardTitle>
                    <CardDescription>{currentLesson?.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose prose-sm max-w-none">
                      <p>{currentLesson?.content?.explanation}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Examples:</h4>
                      {currentLesson?.content?.examples?.map((example, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-2">
                          <div className="text-2xl font-bold">{Object.values(example)[0]}</div>
                          <div className="text-lg text-muted-foreground">{example.english}</div>
                          <div className="text-sm text-muted-foreground">{example.breakdown}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            {currentQuiz && (
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        {currentQuiz.title}
                      </CardTitle>
                      <Badge variant="secondary">
                        {currentQuestionIndex + 1} / {currentQuiz.questions.length}
                      </Badge>
                    </div>
                    <Progress
                      value={((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}
                      className="h-2"
                    />
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {currentQuestion && (
                      <>
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
                        </div>

                        <div className="space-y-3">
                          {currentQuestion.options.map((option, index) => (
                            <Button
                              key={index}
                              variant={selectedAnswer === index ? "default" : "outline"}
                              className="w-full justify-start text-left h-auto p-4"
                              onClick={() => handleQuizAnswer(index)}
                              disabled={showQuizResult}
                            >
                              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </Button>
                          ))}
                        </div>

                        {showQuizResult && (
                          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                            <div className="flex items-center gap-2">
                              {selectedAnswer === currentQuestion.correct ? (
                                <>
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                  <span className="text-green-600 font-semibold">Correct!</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-5 w-5 text-red-500" />
                                  <span className="text-red-600 font-semibold">Incorrect</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                          </div>
                        )}

                        <div className="flex justify-center">
                          {!showQuizResult ? (
                            <Button onClick={submitQuizAnswer} disabled={selectedAnswer === null} className="gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Submit Answer
                            </Button>
                          ) : (
                            <Button onClick={nextQuestion} className="gap-2">
                              {currentQuestionIndex < currentQuiz.questions.length - 1
                                ? "Next Question"
                                : "Complete Quiz"}
                              <ArrowLeft className="h-4 w-4 rotate-180" />
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
