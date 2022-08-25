import React, { SyntheticEvent, useState } from "react"
import Layout from "../../components/layout"
import { BiDumbbell } from "react-icons/bi"
import { useB3nchClient } from "@b3nch/client"
import TokenService from "../../services/token.service"
import { useRouter } from "next/router"

const Login = () => {
  const { getToken, getCurrentUser } = useB3nchClient(
    process.env.NEXT_PUBLIC_API_URL || ""
  )
  const router = useRouter()
  const tokenService = new TokenService()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [fetching, setFetching] = useState(false)

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      if (email.length > 0 && password.length > 0) {
        setFetching(true)
        setError("")
        const token = await (await getToken({ email, password })).access_token
        tokenService.saveToken(token)
        const user = await getCurrentUser({ token })
        if (!user.id) throw new Error("Invalid credentials")
        router.push("/")
      }
    } catch (err) {
      setError("Invalid credentials.")
      setFetching(false)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-50 text-slate-600">
      <form onSubmit={(e) => onFormSubmit(e)} action="">
        <p className="mb-5 flex items-center justify-center text-3xl font-bold">
          <BiDumbbell className="mr-1 text-lime-500" />
          Login
        </p>
        <div className="space-y-3">
          <div className="">
            <p className="mb-0.5 pl-1 text-xs text-lime-500">
              Username<span className="text-rose-500">*</span>
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="w-full rounded-lg border bg-stone-100 px-3 py-1 text-sm outline-none"
            />
          </div>
          <div className="">
            <p className="mb-0.5 pl-1 text-xs text-lime-500">
              Password<span className="text-rose-500">*</span>
            </p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="w-full rounded-lg border bg-stone-100 px-3 py-1 text-sm outline-none"
            />
            <p className="mt-0.5 pl-1 text-xs text-rose-500">{error}</p>
          </div>
          <button className="w-full rounded-lg bg-lime-500 px-3 py-1 text-sm text-white outline-none hover:bg-lime-500">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
