"use client"

import type React from "react"

import { AuthProvider } from "@/hooks/use-auth"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

export default ClientLayout
