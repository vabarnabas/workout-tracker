import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { HiBadgeCheck, HiPlus, HiPlusSm } from "react-icons/hi"
import { useClient } from "workout-tracker-client"
import { Workout } from "workout-tracker-client/dist/types"
import Layout from "../../components/layout"
import TokenService from "../../services/token.service"

const Exercises = () => {
  const router = useRouter()
  const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")
  const tokenservice = new TokenService()
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const data = await client.getWorkouts({ token })
      setWorkouts(data)
    }

    getData()
  }, [])

  return (
    <Layout>
      <div className="h-full w-full px-4 py-2">
        <div className="mb-4 flex w-full items-center justify-end">
          <button
            onClick={() => router.push("/exercises/form")}
            className="flex items-center justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white outline-none hover:bg-blue-500"
          >
            <HiPlusSm className="mr-1" />
            New Exercise
          </button>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-3">
          {workouts
            .sort((a, b) => a.displayName.localeCompare(b.displayName))
            .map((workout) => (
              <div
                className={`flex cursor-pointer flex-col items-start justify-center rounded-md bg-lighterGray py-2.5 px-4 text-sm
                  `}
                key={workout.id}
              >
                <div className="flex items-center justify-center">
                  {workout.displayName}
                  {workout.verified && (
                    <HiBadgeCheck className="ml-1 text-blue-400" />
                  )}
                </div>
                {workout.categories.length !== 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {workout.categories.map((category) => (
                      <p
                        key={category.id}
                        className="rounded-md bg-lightGray px-3 py-1 text-center text-xs"
                      >
                        {category.displayName}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Exercises
