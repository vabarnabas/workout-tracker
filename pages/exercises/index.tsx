import { useRouter } from "next/router"
import React from "react"
import { HiPlus, HiPlusSm } from "react-icons/hi"
import Layout from "../../components/layout"

const Exercises = () => {
  const router = useRouter()

  return (
    <Layout>
      <div className="h-full w-full px-4 py-2">
        <div className="flex w-full items-center justify-end">
          <button
            onClick={() => router.push("/exercises/form")}
            className="flex items-center justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white outline-none hover:bg-blue-500"
          >
            <HiPlusSm className="mr-1" />
            New Exercise
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Exercises
