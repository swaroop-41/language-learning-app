"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Utensils, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

const culturalInsights = {
  telugu: {
    name: "Telugu Culture",
    festivals: [
      { name: "Ugadi", description: "Telugu New Year celebration", date: "March/April", icon: "🎊" },
      { name: "Sankranti", description: "Harvest festival with kite flying", date: "January", icon: "🪁" },
      { name: "Bonalu", description: "Festival honoring goddess Mahakali", date: "July/August", icon: "🙏" },
    ],
    food: [
      { name: "Biryani", description: "Aromatic rice dish with spices", region: "Hyderabad", icon: "🍚" },
      { name: "Pesarattu", description: "Green gram dosa", region: "Andhra Pradesh", icon: "🥞" },
      { name: "Gongura", description: "Tangy sorrel leaves curry", region: "Telangana", icon: "🌿" },
    ],
    traditions: [
      { name: "Bommala Koluvu", description: "Doll display during Navratri", icon: "🪆" },
      { name: "Bathukamma", description: "Floral festival celebrating nature", icon: "🌸" },
      { name: "Kolatam", description: "Traditional stick dance", icon: "💃" },
    ],
  },
  tamil: {
    name: "Tamil Culture",
    festivals: [
      { name: "Pongal", description: "Harvest festival thanking nature", date: "January", icon: "🌾" },
      { name: "Diwali", description: "Festival of lights", date: "October/November", icon: "🪔" },
      { name: "Navaratri", description: "Nine nights of dance and devotion", date: "September/October", icon: "💃" },
    ],
    food: [
      { name: "Sambar", description: "Lentil curry with vegetables", region: "Tamil Nadu", icon: "🍲" },
      { name: "Idli", description: "Steamed rice cakes", region: "South India", icon: "⚪" },
      { name: "Filter Coffee", description: "Traditional South Indian coffee", region: "Tamil Nadu", icon: "☕" },
    ],
    traditions: [
      { name: "Bharatanatyam", description: "Classical dance form", icon: "💃" },
      { name: "Kolam", description: "Floor art with rice flour", icon: "🎨" },
      { name: "Carnatic Music", description: "Classical music tradition", icon: "🎵" },
    ],
  },
}

export default function CulturalInsightsPage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("telugu")

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Cultural Insights</h1>
            <p className="text-muted-foreground">Discover the rich traditions and heritage</p>
          </div>
        </div>

        <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-card glass-effect">
            <TabsTrigger value="telugu">Telugu Culture</TabsTrigger>
            <TabsTrigger value="tamil">Tamil Culture</TabsTrigger>
          </TabsList>

          {Object.entries(culturalInsights).map(([key, culture]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Festivals */}
                <Card className="bg-gradient-card glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Festivals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {culture.festivals.map((festival, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                        <span className="text-2xl">{festival.icon}</span>
                        <div>
                          <h4 className="font-semibold">{festival.name}</h4>
                          <p className="text-sm text-muted-foreground">{festival.description}</p>
                          <Badge variant="secondary" className="mt-1">
                            {festival.date}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Food */}
                <Card className="bg-gradient-card glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-secondary" />
                      Traditional Food
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {culture.food.map((dish, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                        <span className="text-2xl">{dish.icon}</span>
                        <div>
                          <h4 className="font-semibold">{dish.name}</h4>
                          <p className="text-sm text-muted-foreground">{dish.description}</p>
                          <Badge variant="outline" className="mt-1">
                            {dish.region}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Traditions */}
                <Card className="bg-gradient-card glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Traditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {culture.traditions.map((tradition, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                        <span className="text-2xl">{tradition.icon}</span>
                        <div>
                          <h4 className="font-semibold">{tradition.name}</h4>
                          <p className="text-sm text-muted-foreground">{tradition.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
