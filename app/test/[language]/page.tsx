"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, Award, CheckCircle, XCircle } from "lucide-react"

const testData = {
  telugu: {
    name: "Telugu",
    flag: "🇮🇳",
    questions: [
      {
        id: 1,
        question: "What does 'నమస్కారం' mean?",
        options: ["Hello/Goodbye", "Thank you", "Please", "Excuse me"],
        correct: 0,
        explanation: "నమస్కారం (Namaskaram) is the traditional Telugu greeting meaning both hello and goodbye.",
      },
      {
        id: 2,
        question: "How do you say 'Thank you' in Telugu?",
        options: ["నమస్కారం", "ధన్యవాదాలు", "క్షమించండి", "దయచేసి"],
        correct: 1,
        explanation: "ధన్యవాదాలు (Dhanyavadalu) means 'Thank you' in Telugu.",
      },
      {
        id: 3,
        question: "What is the Telugu word for 'One'?",
        options: ["రెండు", "మూడు", "ఒకటి", "నాలుగు"],
        correct: 2,
        explanation: "ఒకటి (Okati) means 'One' in Telugu.",
      },
      {
        id: 4,
        question: "Which is the correct pronunciation of 'రెండు'?",
        options: ["Okati", "Rendu", "Moodu", "Nalugu"],
        correct: 1,
        explanation: "రెండు is pronounced as 'Rendu' and means 'Two' in Telugu.",
      },
      {
        id: 5,
        question: "What does 'అమ్మ' mean in Telugu?",
        options: ["Father", "Mother", "Brother", "Sister"],
        correct: 1,
        explanation: "అమ్మ (Amma) means 'Mother' in Telugu.",
      },
    ],
  },
  kannada: {
    name: "Kannada",
    flag: "🇮🇳",
    questions: [
      {
        id: 1,
        question: "What does 'ನಮಸ್ಕಾರ' mean?",
        options: ["Hello/Goodbye", "Thank you", "Please", "Excuse me"],
        correct: 0,
        explanation: "ನಮಸ್ಕಾರ (Namaskara) is the traditional Kannada greeting.",
      },
      {
        id: 2,
        question: "How do you say 'Thank you' in Kannada?",
        options: ["ನಮಸ್ಕಾರ", "ಧನ್ಯವಾದ", "ಕ್ಷಮಿಸಿ", "ದಯವಿಟ್ಟು"],
        correct: 1,
        explanation: "ಧನ್ಯವಾದ (Dhanyavada) means 'Thank you' in Kannada.",
      },
    ],
  },
  tamil: {
    name: "Tamil",
    flag: "🇮🇳",
    questions: [
      {
        id: 1,
        question: "What does 'வணக்கம்' mean?",
        options: ["Hello/Goodbye", "Thank you", "Please", "Excuse me"],
        correct: 0,
        explanation: "வணக்கம் (Vanakkam) is the traditional Tamil greeting.",
      },
    ],
  },
  hindi: {
    name: "Hindi",
    flag: "🇮🇳",
    questions: [
      {
        id: 1,
        question: "What does 'नमस्ते' mean?",
        options: ["Hello/Goodbye", "Thank you", "Please", "Excuse me"],
        correct: 0,
        explanation: "नमस्ते (Namaste) is the traditional Hindi greeting.",
      },
    ],
  },
  malayalam: {
    name: "Malayalam",
    flag: "🇮🇳",
    questions: [
      {
        id: 1,
        question: "What does 'നമസ്കാരം' mean?",
        options: ["Hello/Goodbye", "Thank you", "Please", "Excuse me"],
        correct: 0,
        explanation: "നമസ്കാരം (Namaskaram) is the traditional Malayalam greeting.",
      },
    ],
  },
}

export default function TestLanguagePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [testStarted, setTestStarted] = useState(false)

  const language = params.language as string
  const testInfo = testData[language as keyof typeof testData]

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!testInfo) {
      router.push("/dashboard")
      return
    }
  }, [user, router, testInfo])

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitTest()
    }
  }, [timeLeft, testStarted, showResults])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < testInfo.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    testInfo.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return {
      correct,
      total: testInfo.questions.length,
      percentage: Math.round((correct / testInfo.questions.length) * 100),
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!testInfo) {
    return <div>Test not found</div>
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">{testInfo.flag}</span>
                <div>
                  <CardTitle className="text-2xl">{testInfo.name} Assessment</CardTitle>
                  <CardDescription>Test your knowledge and track your progress</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 text-center">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span>{testInfo.questions.length} questions</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 max-w-md mx-auto">
                  This assessment will test your understanding of basic {testInfo.name} vocabulary and grammar. You'll
                  have 5 minutes to complete all questions.
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={() => setTestStarted(true)} size="lg">
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Assessment Results</CardTitle>
              <CardDescription>{testInfo.name} Language Test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-blue-600">{score.percentage}%</div>
                <div className="text-lg text-gray-600">
                  {score.correct} out of {score.total} correct
                </div>
                <Badge
                  variant={score.percentage >= 80 ? "default" : score.percentage >= 60 ? "secondary" : "destructive"}
                  className="mt-2"
                >
                  {score.percentage >= 80 ? "Excellent!" : score.percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
                </Badge>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Review Your Answers</h3>
                {testInfo.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index]
                  const isCorrect = userAnswer === question.correct
                  return (
                    <Card
                      key={question.id}
                      className={`${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-1" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium mb-2">{question.question}</div>
                            <div className="text-sm space-y-1">
                              <div>
                                Your answer:{" "}
                                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                                  {question.options[userAnswer] || "Not answered"}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div>
                                  Correct answer:{" "}
                                  <span className="text-green-600">{question.options[question.correct]}</span>
                                </div>
                              )}
                              <div className="text-gray-600 mt-2">{question.explanation}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={() => router.push(`/learn/${language}`)}>Continue Learning</Button>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = testInfo.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / testInfo.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{testInfo.flag}</span>
            <span className="font-semibold">{testInfo.name} Test</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className={`font-mono ${timeLeft < 60 ? "text-red-500" : ""}`}>{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="outline">
              {currentQuestion + 1} / {testInfo.questions.length}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                Previous
              </Button>

              {currentQuestion === testInfo.questions.length - 1 ? (
                <Button onClick={handleSubmitTest}>Submit Test</Button>
              ) : (
                <Button onClick={handleNextQuestion} disabled={selectedAnswers[currentQuestion] === undefined}>
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
