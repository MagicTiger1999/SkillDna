"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

function AuthErrorPageContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessages: Record<string, { title: string; description: string }> = {
    CredentialsSignin: {
      title: "Invalid credentials",
      description: "The email or password you entered is incorrect. Please try again.",
    },
    OAuthSignin: {
      title: "OAuth error",
      description: "There was an error signing in with the provider. Please try again.",
    },
    OAuthCallback: {
      title: "OAuth callback error",
      description: "There was an error during the OAuth callback. Please try again.",
    },
    OAuthCreateAccount: {
      title: "Account creation failed",
      description: "We couldn't create an account for you. Please try again.",
    },
    EmailCreateAccount: {
      title: "Email account creation failed",
      description: "We couldn't create an account with that email. Please try again.",
    },
    Callback: {
      title: "Callback error",
      description: "There was an error during the sign-in process. Please try again.",
    },
    OAuthAccountNotLinked: {
      title: "Account not linked",
      description: "This email is already associated with another account. Please sign in with that account.",
    },
    default: {
      title: "Authentication error",
      description: "An unexpected error occurred. Please try again or contact support.",
    },
  }

  const message = errorMessages[error || "default"] || errorMessages.default

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md text-center">
        <Card className="bg-card border-border/50">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <AlertCircle className="h-6 w-6" />
            </div>
            <CardTitle>{message.title}</CardTitle>
            <CardDescription>{message.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => window.history.back()} variant="outline">
              Try Again
            </Button>
            <Link href="/auth/signin">
              <Button variant="ghost">Back to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthErrorPageContent />
    </Suspense>
  )
}