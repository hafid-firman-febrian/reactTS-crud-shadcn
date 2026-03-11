import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { useNavigate } from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react"

import { login } from "@/api/services/AuthService"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function Login() {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [errorApi, setErrorApi] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string
    password?: string
  }>({}) // Untuk validasi kosong

  const navigate = useNavigate()

  const loginHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setErrorApi(null)
    setFieldErrors({})

    const errors: { username?: string; password?: string } = {}
    if (!userName) errors.username = "Username wajib diisi"
    if (!password) errors.password = "password wajib diisi"

    if (Object.keys(errors).length > 1) {
      setFieldErrors(errors)
      return
    }
    try {
      const response = await login({ username: userName, password: password })
      localStorage.setItem("token", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      console.log(response)
      if (response) {
        navigate("/home")
      }
    } catch (error) {
      setErrorApi(
        "Login gagal. Silakan cek kembali username dan password Anda."
      )
      console.error("Login gagal:", error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home")
    }
  })

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="ghost">
              {/* <Link to="/register">Sign Up</Link> */}
            </Button>
          </CardAction>
          {errorApi && (
            <Alert variant="destructive" className="max-w-md">
              {/* <AlertCircleIcon /> */}
              <AlertTitle>Login Gagal</AlertTitle>
              <AlertDescription>{errorApi}</AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={loginHandler}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Max Leiter"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />

                {fieldErrors.username && (
                  <FieldError>{fieldErrors.username}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {fieldErrors.password && (
                  <FieldError>{fieldErrors.password}</FieldError>
                )}
              </Field>
              <Button type="submit" className="w-full" onSubmit={loginHandler}>
                Login
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
