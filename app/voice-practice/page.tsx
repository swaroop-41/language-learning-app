"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Mic, MicOff, Volume2, RotateCcw, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const voicePracticeScenarios = [
  {
    id: 1,
    title: "Greeting Someone",
    scenario: "You meet a friend at a coffee shop",
    phrases: [
      { text: "Hello, how are you?", telugu: "హలో, ఎలా ఉన్నావు?", pronunciation: "Halo, ela unnavu?" },
      {
        text: "I'm doing well, thank you",
        telugu: "నేను బాగున్నాను, ధన్యవాదాలు",
        pronunciation: "Nenu baagunnanu, dhanyavaadalu",
      },
      { text: "Nice to see you", telugu: "నిన్ను చూడటం ఆనందంగా ఉంది", pronunciation: "Ninnu choodatam aanandanga undi" },
    ],
  },
  {
    id: 2,
    title: "Ordering Food",
    scenario: "You're at a restaurant ordering your meal",
    phrases: [
      { text: "What do you recommend?", telugu: "మీరు ఏమి సిఫార్సు చేస్తారు?", pronunciation: "Meeru emi sifarsu chestaru?" },
      { text: "I'll have the biryani", telugu: "నాకు బిర్యానీ కావాలి", pronunciation: "Naaku biryani kaavaali" },
      { text: "Can I get the bill?", telugu: "బిల్లు తీసుకురాగలరా?", pronunciation: "Billu teesukuraagalara?" },
    ],
  },
]

export default function VoicePracticePage() {
  const router = useRouter()
  const [selectedScenario, setSelectedScenario] = useState(voicePracticeScenarios[0])
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [feedback, setFeedback] = useState<{ score: number; message: string } | null>(null)
  const [practiceScore, setPracticeScore] = useState(0)

  const handleStartRecording = () => {
    setIsRecording(true)
    setFeedback(null)
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false)
      // Simulate AI feedback
      const score = Math.floor(Math.random() * 30) + 70 // Random score between 70-100
      setPracticeScore(score)
      setFeedback({
        score,
        message:
          score >= 85
            ? "Excellent pronunciation!"
            : score >= 70
              ? "Good effort! Try emphasizing the vowels more."
              : "Keep practicing! Focus on the rhythm.",
      })
    }, 3000)
  }

  const handlePlayAudio = () => {
    // Simulate text-to-speech
    console.log("Playing audio for:", selectedScenario.phrases[currentPhraseIndex].telugu)
  }

  const handleNextPhrase = () => {
    if (currentPhraseIndex < selectedScenario.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1)
      setFeedback(null)
      setPracticeScore(0)
    }
  }

  const handlePrevPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1)
      setFeedback(null)
      setPracticeScore(0)
    }
  }

  const currentPhrase = selectedScenario.phrases[currentPhraseIndex]

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Voice Practice</h1>
            <p className="text-muted-foreground">Practice speaking with AI feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Selection */}
          <Card className="bg-gradient-card glass-effect">
            <CardHeader>
              <CardTitle>Practice Scenarios</CardTitle>
              <CardDescription>Choose a conversation scenario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {voicePracticeScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedScenario.id === scenario.id
                      ? "bg-primary/10 border-2 border-primary/20"
                      : "bg-background/50 hover:bg-background/70"
                  }`}
                  onClick={() => {
                    setSelectedScenario(scenario)
                    setCurrentPhraseIndex(0)
                    setFeedback(null)
                    setPracticeScore(0)
                  }}
                >
                  <h4 className="font-semibold">{scenario.title}</h4>
                  <p className="text-sm text-muted-foreground">{scenario.scenario}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Practice Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card glass-effect">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedScenario.title}</CardTitle>
                  <Badge variant="secondary">
                    {currentPhraseIndex + 1} of {selectedScenario.phrases.length}
                  </Badge>
                </div>
                <CardDescription>{selectedScenario.scenario}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Phrase */}
                <div className="text-center space-y-4 p-6 rounded-lg bg-background/50">
                  <p className="text-lg font-medium">{currentPhrase.text}</p>
                  <p className="text-2xl font-bold text-primary">{currentPhrase.telugu}</p>
                  <p className="text-muted-foreground italic">{currentPhrase.pronunciation}</p>

                  <Button variant="outline" onClick={handlePlayAudio} className="gap-2 bg-transparent">
                    <Volume2 className="h-4 w-4" />
                    Listen
                  </Button>
                </div>

                {/* Recording Controls */}
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      onClick={handleStartRecording}
                      disabled={isRecording}
                      className="w-32 h-32 rounded-full"
                    >
                      {isRecording ? (
                        <div className="flex flex-col items-center gap-2">
                          <MicOff className="h-8 w-8 animate-pulse" />
                          <span className="text-sm">Recording...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Mic className="h-8 w-8" />
                          <span className="text-sm">Tap to Record</span>
                        </div>
                      )}
                    </Button>
                  </div>

                  {/* Feedback */}
                  {feedback && (
                    <Card className="bg-background/50">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {feedback.score >= 85 ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-orange-500" />
                          )}
                          <span className="font-semibold">Score: {feedback.score}%</span>
                        </div>
                        <Progress value={feedback.score} className="mb-2" />
                        <p className="text-sm text-muted-foreground">{feedback.message}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevPhrase} disabled={currentPhraseIndex === 0}>
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFeedback(null)
                      setPracticeScore(0)
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={handleNextPhrase}
                    disabled={currentPhraseIndex === selectedScenario.phrases.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
