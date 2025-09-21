"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Volume2, Award, ArrowLeft, Play, CheckCircle } from "lucide-react"

const languageData = {
  telugu: {
    name: "Telugu",
    flag: "🇮🇳",
    color: "bg-orange-500",
    lessons: [
      { id: 1, title: "Basic Greetings", type: "vocabulary", completed: true, xp: 50 },
      { id: 2, title: "Numbers 1-10", type: "vocabulary", completed: true, xp: 50 },
      { id: 3, title: "Family Members", type: "vocabulary", completed: false, xp: 50 },
      { id: 4, title: "Present Tense Verbs", type: "grammar", completed: false, xp: 75 },
      { id: 5, title: "Colors", type: "vocabulary", completed: false, xp: 50 },
    ],
    vocabulary: [
      { word: "నమస్కారం", pronunciation: "Namaskaram", meaning: "Hello/Goodbye", audio: "/audio/telugu/namaskaram.mp3" },
      { word: "ధన్యవాదాలు", pronunciation: "Dhanyavadalu", meaning: "Thank you", audio: "/audio/telugu/dhanyavadalu.mp3" },
      { word: "ఒకటి", pronunciation: "Okati", meaning: "One", audio: "/audio/telugu/okati.mp3" },
      { word: "రెండు", pronunciation: "Rendu", meaning: "Two", audio: "/audio/telugu/rendu.mp3" },
    ],
  },
  kannada: {
    name: "Kannada",
    flag: "🇮🇳",
    color: "bg-red-500",
    lessons: [
      { id: 1, title: "Basic Greetings", type: "vocabulary", completed: false, xp: 50 },
      { id: 2, title: "Numbers 1-10", type: "vocabulary", completed: false, xp: 50 },
      { id: 3, title: "Family Members", type: "vocabulary", completed: false, xp: 50 },
      { id: 4, title: "Present Tense Verbs", type: "grammar", completed: false, xp: 75 },
    ],
    vocabulary: [
      { word: "ನಮಸ್ಕಾರ", pronunciation: "Namaskara", meaning: "Hello/Goodbye", audio: "/audio/kannada/namaskara.mp3" },
      { word: "ಧನ್ಯವಾದ", pronunciation: "Dhanyavada", meaning: "Thank you", audio: "/audio/kannada/dhanyavada.mp3" },
    ],
  },
  tamil: {
    name: "Tamil",
    flag: "🇮🇳",
    color: "bg-green-500",
    lessons: [
      { id: 1, title: "Basic Greetings", type: "vocabulary", completed: false, xp: 50 },
      { id: 2, title: "Numbers 1-10", type: "vocabulary", completed: false, xp: 50 },
      { id: 3, title: "Family Members", type: "vocabulary", completed: false, xp: 50 },
    ],
    vocabulary: [
      { word: "வணக்கம்", pronunciation: "Vanakkam", meaning: "Hello/Goodbye", audio: "/audio/tamil/vanakkam.mp3" },
      { word: "நன்றி", pronunciation: "Nandri", meaning: "Thank you", audio: "/audio/tamil/nandri.mp3" },
    ],
  },
  hindi: {
    name: "Hindi",
    flag: "🇮🇳",
    color: "bg-blue-500",
    lessons: [
      { id: 1, title: "Basic Greetings", type: "vocabulary", completed: false, xp: 50 },
      { id: 2, title: "Numbers 1-10", type: "vocabulary", completed: false, xp: 50 },
    ],
    vocabulary: [
      { word: "नमस्ते", pronunciation: "Namaste", meaning: "Hello/Goodbye", audio: "/audio/hindi/namaste.mp3" },
      { word: "धन्यवाद", pronunciation: "Dhanyavad", meaning: "Thank you", audio: "/audio/hindi/dhanyavad.mp3" },
    ],
  },
  malayalam: {
    name: "Malayalam",
    flag: "🇮🇳",
    color: "bg-purple-500",
    lessons: [
      { id: 1, title: "Basic Greetings", type: "vocabulary", completed: false, xp: 50 },
      { id: 2, title: "Numbers 1-10", type: "vocabulary", completed: false, xp: 50 },
    ],
    vocabulary: [
      {
        word: "നമസ്കാരം",
        pronunciation: "Namaskaram",
        meaning: "Hello/Goodbye",
        audio: "/audio/malayalam/namaskaram.mp3",
      },
      { word: "നന്ദി", pronunciation: "Nandi", meaning: "Thank you", audio: "/audio/malayalam/nandi.mp3" },
    ],
  },
}

export default function LearnLanguagePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  const language = params.language as string
  const languageInfo = languageData[language as keyof typeof languageData]

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!languageInfo) {
      router.push("/dashboard")
      return
    }

    // Calculate progress
    const completedLessons = languageInfo.lessons.filter((lesson) => lesson.completed).length
    const totalLessons = languageInfo.lessons.length
    setProgress((completedLessons / totalLessons) * 100)
  }, [user, router, languageInfo])

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play().catch(console.error)
  }

  if (!languageInfo) {
    return <div>Language not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{languageInfo.flag}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{languageInfo.name}</h1>
              <p className="text-gray-600">Master the language step by step</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{languageInfo.lessons.filter((l) => l.completed).length} Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span>{languageInfo.lessons.length} Total Lessons</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-4">
            <div className="grid gap-4">
              {languageInfo.lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${lesson.completed ? "bg-green-50 border-green-200" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${lesson.completed ? "bg-green-500" : "bg-gray-200"}`}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{lesson.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={lesson.type === "vocabulary" ? "default" : "secondary"}>
                              {lesson.type}
                            </Badge>
                            <span className="text-sm text-gray-600">+{lesson.xp} XP</span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedLesson(lesson.id)} disabled={lesson.completed}>
                        {lesson.completed ? "Completed" : "Start Lesson"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vocabulary" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {languageInfo.vocabulary.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{item.word}</div>
                        <div className="text-lg text-gray-600 italic">{item.pronunciation}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-2">Meaning</div>
                        <div className="font-medium">{item.meaning}</div>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playAudio(item.audio)}
                          className="flex items-center gap-2"
                        >
                          <Volume2 className="h-4 w-4" />
                          Listen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
