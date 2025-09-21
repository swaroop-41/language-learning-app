"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trophy, Star, Clock, Target, BookOpen } from "lucide-react"

const testData = {
  telugu: {
    name: "Telugu",
    nativeName: "తెలుగు",
    color: "from-blue-500 to-blue-600",
    tests: [
      {
        id: 1,
        title: "Beginner Assessment",
        description: "Test your basic Telugu knowledge",
        duration: 10,
        questions: [
          {
            type: "multiple-choice",
            question: "What does 'నమస్కారం' mean?",
            options: ["Thank you", "Hello", "Sorry", "Goodbye"],
            correct: 1,
            points: 10,
          },
          {
            type: "translation",
            question: "Translate 'Thank you' to Telugu",
            answer: "ధన్యవాదాలు",
            points: 15,
          },
          {
            type: "listening",
            question: "Listen and select the correct meaning",
            audio: "pronunciation of క్షమించండి",
            options: ["Hello", "Thank you", "Sorry", "Name"],
            correct: 2,
            points: 20,
          },
        ],
      },
    ],
  },
  kannada: {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    color: "from-red-500 to-red-600",
    tests: [
      {
        id: 1,
        title: "Basic Kannada Test",
        description: "Evaluate your Kannada fundamentals",
        duration: 10,
        questions: [
          {
            type: "multiple-choice",
            question: "How do you say 'Father' in Kannada?",
            options: ["ಅಮ್ಮ", "ಅಪ್ಪ", "ಅಣ್ಣ", "ಅಕ್ಕ"],
            correct: 1,
            points: 10,
          },
          {
            type: "translation",
            question: "Translate 'Thank you' to Kannada",
            answer: "ಧನ್ಯವಾದಗಳು",
            points: 15,
          },
        ],
      },
    ],
  },
  tamil: {
    name: "Tamil",
    nativeName: "தமிழ்",
    color: "from-green-500 to-green-600",
    tests: [
      {
        id: 1,
        title: "Tamil Basics Test",
        description: "Test your Tamil language skills",
        duration: 12,
        questions: [
          {
            type: "multiple-choice",
            question: "What color is 'சிவப்பு'?",
            options: ["Blue", "Green", "Red", "Yellow"],
            correct: 2,
            points: 10,
          },
          {
            type: "translation",
            question: "Translate 'Hello' to Tamil",
            answer: "வணக்கம்",
            points: 15,
          },
        ],
      },
    ],
  },
  hindi: {
    name: "Hindi",
    nativeName: "हिन्दी",
    color: "from-orange-500 to-orange-600",
    tests: [
      {
        id: 1,
        title: "Hindi Fundamentals",
        description: "Assess your Hindi language knowledge",
        duration: 15,
        questions: [
          {
            type: "multiple-choice",
            question: "What day is 'सोमवार'?",
            options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
            correct: 1,
            points: 10,
          },
          {
            type: "translation",
            question: "Translate 'Thank you' to Hindi",
            answer: "धन्यवाद",
            points: 15,
          },
        ],
      },
    ],
  },
  malayalam: {
    name: "Malayalam",
    nativeName: "മലയാളം",
    color: "from-purple-500 to-purple-600",
    tests: [
      {
        id: 1,
        title: "Malayalam Assessment",
        description: "Test your Malayalam proficiency",
        duration: 12,
        questions: [
          {
            type: "multiple-choice",
            question: "What is 'ചോറ്' in English?",
            options: ["Fish", "Rice", "Milk", "Water"],
            correct: 1,
            points: 10,
          },
          {
            type: "translation",
            question: "Translate 'Water' to Malayalam",
            answer: "വെള്ളം",
            points: 15,
          },
        ],
      },
    ],
  },
}

export default function TestPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const language = params.language as string

  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [userAnswers, setUserAnswers] = useState<(number | string | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  const currentLanguageData = testData[language as keyof typeof testData]
  const currentTest = currentLanguageData?.tests[0]
  const currentQuestion = currentTest?.questions[currentQuestionIndex]

  useEffect(() => {
    if (!currentLanguageData) {
      router.push("/dashboard")
    }
  }, [currentLanguageData, router])

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (testStarted && timeLeft === 0) {
      completeTest()
    }
  }, [testStarted, timeLeft])

  const startTest = () => {
    if (!currentTest) return
    setTestStarted(true)
    setTimeLeft(currentTest.duration * 60) // Convert minutes to seconds
    setUserAnswers(new Array(currentTest.questions.length).fill(null))
    setMaxScore(currentTest.questions.reduce((sum, q) => sum + q.points, 0))
  }

  const handleAnswer = (answer: number | string) => {
    setSelectedAnswer(answer)
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (!currentTest) return

    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1])
    } else {
      completeTest()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1])
    }
  }

  const completeTest = () => {
    if (!currentTest) return

    let totalScore = 0
    currentTest.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index]
      if (question.type === "multiple-choice" && userAnswer === question.correct) {
        totalScore += question.points
      } else if (
        question.type === "translation" &&
        typeof userAnswer === "string" &&
        userAnswer.toLowerCase().trim() === question.answer.toLowerCase()
      ) {
        totalScore += question.points
      }
    })

    setScore(totalScore)
    setTestCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading || !currentLanguageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading test...</p>
        </div>
      </div>
    )
  }

  if (testCompleted) {
    const percentage = Math.round((score / maxScore) * 100)
    const grade =
      percentage >= 90 ? "Excellent" : percentage >= 70 ? "Good" : percentage >= 50 ? "Fair" : "Needs Improvement"

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <header className="border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">Test Results</h1>
            <div />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentLanguageData.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                >
                  <Trophy className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl">Test Completed!</CardTitle>
                <CardDescription>Your {currentLanguageData.name} assessment results</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">{percentage}%</div>
                  <div className="text-lg font-semibold">{grade}</div>
                  <div className="text-muted-foreground">
                    {score} out of {maxScore} points
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{currentTest?.questions.length}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userAnswers.filter((a) => a !== null).length}</div>
                    <div className="text-sm text-muted-foreground">Answered</div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button onClick={() => router.push(`/learn/${language}`)} className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Continue Learning
                  </Button>
                  <Button variant="outline" onClick={() => window.location.reload()} className="gap-2">
                    <Target className="h-4 w-4" />
                    Retake Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <header className="border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">{currentLanguageData.name} Test</h1>
            <div />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentLanguageData.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                >
                  <Target className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl">{currentTest?.title}</CardTitle>
                <CardDescription>{currentTest?.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <Clock className="h-6 w-6 mx-auto text-muted-foreground" />
                    <div className="text-sm font-medium">{currentTest?.duration} minutes</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div className="space-y-2">
                    <BookOpen className="h-6 w-6 mx-auto text-muted-foreground" />
                    <div className="text-sm font-medium">{currentTest?.questions.length} questions</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="space-y-2">
                    <Star className="h-6 w-6 mx-auto text-muted-foreground" />
                    <div className="text-sm font-medium">{maxScore} points</div>
                    <div className="text-xs text-muted-foreground">Max Score</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Test Instructions:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Answer all questions to the best of your ability</li>
                    <li>You can navigate between questions using the buttons</li>
                    <li>The test will auto-submit when time runs out</li>
                    <li>Make sure you have a stable internet connection</li>
                  </ul>
                </div>

                <Button onClick={startTest} className="w-full gap-2" size="lg">
                  <Target className="h-5 w-5" />
                  Start Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Question {currentQuestionIndex + 1}</Badge>
            <Progress
              value={((currentQuestionIndex + 1) / (currentTest?.questions.length || 1)) * 100}
              className="w-32 h-2"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10">
              <Clock className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {currentQuestion && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentQuestion.type.replace("-", " ")}</Badge>
                  <Badge variant="secondary">{currentQuestion.points} points</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {currentQuestion.type === "multiple-choice" && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto p-4"
                        onClick={() => handleAnswer(index)}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "translation" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      className="w-full p-3 border rounded-lg"
                      value={(selectedAnswer as string) || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                  </Button>

                  <Button onClick={nextQuestion} disabled={selectedAnswer === null || selectedAnswer === ""}>
                    {currentQuestionIndex === (currentTest?.questions.length || 1) - 1 ? "Finish Test" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
