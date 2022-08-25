import { useB3nchClient } from "@b3nch/client"
import { User } from "@b3nch/client/dist/types"
import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import TokenService from "../services/token.service"

const Home: NextPage = () => {
  const { getUsers } = useB3nchClient(process.env.NEXT_PUBLIC_API_URL || "")
  const tokenService = new TokenService()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await getUsers({ token: tokenService.getToken() }))
    }

    fetchUsers()
  }, [])

  return (
    <Layout>
      <div className="flex h-full w-full items-start justify-center">
        <div className="w-full px-4">
          {users.map((user) => (
            <div key={user.id} className="rounded-md border px-2 py-2">
              <p className="font-medium text-lime-500">{`${user.displayName}`}</p>
              <p className="-mt-1 text-xs">{`@${user.handle}`}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
