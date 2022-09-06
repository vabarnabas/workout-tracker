import { Switch } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { useClient } from "workout-tracker-client"
import { User } from "workout-tracker-client/dist/types"
import Layout from "../../components/layout"
import Spinner from "../../components/spinner"
import TokenService from "../../services/token.service"

const Exercises = () => {
  const router = useRouter()
  const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")
  const tokenservice = new TokenService()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [currentUser, setCurrentUser] = useState<User>({} as User)

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const data = await client.getCurrentUser({ token })
      setCurrentUser(data)
    }

    getData()
  }, [])

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (password.length >= 8) {
      const token = await tokenservice.getToken()
      try {
        await client.updateUser({ token, id: currentUser.id, password })
        await tokenservice.deleteToken()
        router.push("/login")
      } catch {}
    } else {
      setError("Something went wrong")
    }
  }

  return (
    <Layout>
      <div className="h-full w-full px-4 py-2">
        {Object.keys(currentUser).length === 0 ? (
          <Spinner />
        ) : (
          <form
            onSubmit={(e) => onFormSubmit(e)}
            action=""
            className="space-y-3"
          >
            <div className="">
              <p className="mb-0.5 pl-1 text-xs text-blue-400">Full Name</p>
              {/* <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        type="text"
        className="w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
        required
      /> */}
              <p className="w-full pl-1 text-sm">{currentUser.displayName}</p>
            </div>
            <div className="">
              <p className="mb-0.5 pl-1 text-xs text-blue-400">Handle</p>
              {/* <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        type="text"
        className="w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
        required
      /> */}
              <p className="w-full pl-1 text-sm">{`@${currentUser.handle}`}</p>
            </div>
            <div className="">
              <p className="mb-0.5 pl-1 text-xs text-blue-400">
                Password<span className="text-rose-500">*</span>
              </p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
                required
              />
              {error && (
                <p className="mt-0.5 pl-1 text-xs text-rose-500">{error}</p>
              )}
            </div>
            <button className="w-full rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white outline-none hover:bg-blue-500">
              Change Password
            </button>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default Exercises
