"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Calendar, TrendingUp, Trophy } from "lucide-react"

interface StreakData {
  currentStreak: number
  longestStreak: number
  totalDays: number
  lastActivityDate: Date | null
  streakHistory: Date[]
}

interface StreakTrackerProps {
  streakData: StreakData
}

export function StreakTracker({ streakData }: StreakTrackerProps) {
  const { currentStreak, longestStreak, totalDays, streakHistory } = streakData

  // Generate calendar for current month
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const isActiveDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return streakHistory.some((streakDate) => streakDate.toDateString() === date.toDateString())
  }

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth()
  }

  return (
    <div className="space-y-6">
      {/* Streak Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Current Streak</span>
            </div>
            <div className="text-2xl font-bold text-secondary">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Longest Streak</span>
            </div>
            <div className="text-2xl font-bold text-primary">{longestStreak}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Total Active Days</span>
            </div>
            <div className="text-2xl font-bold text-green-500">{totalDays}</div>
            <div className="text-xs text-muted-foreground">this month</div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Activity Calendar - {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg
                    ${
                      day === null
                        ? ""
                        : isActiveDay(day)
                          ? "bg-secondary text-secondary-foreground font-semibold"
                          : isToday(day)
                            ? "bg-primary/10 border-2 border-primary text-primary font-semibold"
                            : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-secondary"></div>
                <span>Active day</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded border-2 border-primary bg-primary/10"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-muted/30"></div>
                <span>Inactive</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Streak Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { days: 7, name: "Week Warrior", achieved: currentStreak >= 7 },
              { days: 14, name: "Two Week Champion", achieved: currentStreak >= 14 },
              { days: 30, name: "Monthly Master", achieved: currentStreak >= 30 },
              { days: 100, name: "Century Achiever", achieved: currentStreak >= 100 },
            ].map((milestone) => (
              <div key={milestone.days} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.achieved ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.achieved ? "✓" : milestone.days}
                  </div>
                  <div>
                    <div className="font-medium">{milestone.name}</div>
                    <div className="text-sm text-muted-foreground">{milestone.days} day streak</div>
                  </div>
                </div>
                <Badge variant={milestone.achieved ? "default" : "secondary"}>
                  {milestone.achieved ? "Achieved" : "Locked"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
