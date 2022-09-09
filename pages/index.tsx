import { useB3nchClient } from "@b3nch/client"
import { User } from "@b3nch/client/dist/types"
import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import TokenService from "../services/token.service"
import { HiPlusSm } from "react-icons/hi"
import { Post } from "workout-tracker-client/dist/types"
import { useClient } from "workout-tracker-client"
import { useRouter } from "next/router"
import Spinner from "../components/spinner"

const Home: NextPage = () => {
  const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")
  const router = useRouter()
  const tokenservice = new TokenService()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const data = await client.getPosts({ token })
      setPosts(data)
    }

    getData()
  }, [])

  return (
    <Layout>
      <div className="h-full w-full overflow-y-auto px-4 py-2">
        <div className="mb-3 flex w-full items-center justify-end gap-x-3">
          {/* <div
            onClick={() => {
              setEnabled(!enabled)
            }}
            className="flex cursor-pointer items-center justify-center"
          >
            <p className="mr-3 text-sm">My Plans Only</p>
            <Switch
              checked={enabled}
              className={`${enabled ? "bg-blue-400" : "bg-lightGray"}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block aspect-square h-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div> */}
          {/* <textarea
            className="w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
            rows={3}
            placeholder="What is on your mind?"
          ></textarea> */}
          <button
            onClick={() => router.push("/collections/form")}
            className="flex min-w-max items-center justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white outline-none hover:bg-blue-500"
          >
            <HiPlusSm className="mr-1" />
            New Post
          </button>
        </div>
        {posts.length === 0 ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-3">
            {posts
              // .sort((a, b) => {
              //   return b.createdAt - a.createdAt
              // })
              // .filter((collection) =>
              //   collection.displayName
              //     .toLocaleLowerCase()
              //     .includes(query.toLocaleLowerCase())
              // )
              .map((post) => (
                <div
                  className={`flex flex-col items-start justify-center rounded-md bg-lighterGray py-2.5 px-4 text-sm
                `}
                  key={post.id}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="">
                      <p className="cursor-pointer text-base font-medium hover:underline">
                        {post.user && post.user.displayName}
                      </p>
                      <p className="text-xs font-light opacity-60">{`@${
                        post.user && post.user.handle
                      }`}</p>
                    </div>
                  </div>
                  <p className="mt-3">{post.description}</p>
                  <p
                    onClick={() => router.push(`/plans/${post.planId}`)}
                    className="mt-3 cursor-pointer rounded-md bg-blue-400 px-3 py-1 text-center text-xs hover:bg-blue-500"
                  >
                    {post.plan && post.plan.displayName}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Home
