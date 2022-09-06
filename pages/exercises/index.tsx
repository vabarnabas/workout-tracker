import { Switch } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { HiBadgeCheck, HiPlus, HiPlusSm } from "react-icons/hi"
import { useClient } from "workout-tracker-client"
import { Workout } from "workout-tracker-client/dist/types"
import Layout from "../../components/layout"
import Spinner from "../../components/spinner"
import TokenService from "../../services/token.service"

const Exercises = () => {
  const router = useRouter()
  const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")
  const tokenservice = new TokenService()
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [query, setQuery] = useState("")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

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
      <div className="h-full w-full overflow-y-auto px-4 py-2">
        <div className="mb-3 flex flex-col items-start justify-center">
          <div className="mb-3 flex w-full items-center justify-center gap-x-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search..."
              className="w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
            />
            <button
              onClick={() => router.push("/exercises/form")}
              className="flex w-max min-w-max items-center justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white outline-none hover:bg-blue-500"
            >
              <HiPlusSm className="mr-1" />
              New Exercise
            </button>
          </div>
          <div
            onClick={() => {
              setVerifiedOnly(!verifiedOnly)
            }}
            className="ml-1 flex cursor-pointer items-center justify-center"
          >
            <p className="mr-2 inline-flex items-center justify-center text-sm">
              <HiBadgeCheck className="mr-1 text-blue-400" />
              Verified Only
            </p>
            <Switch
              checked={verifiedOnly}
              className={`${verifiedOnly ? "bg-blue-400" : "bg-lightGray"}
          relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${verifiedOnly ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block aspect-square h-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
        {workouts.length === 0 ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-3">
            {workouts
              .sort((a, b) => a.displayName.localeCompare(b.displayName))
              .filter((workout) => (verifiedOnly ? workout.verified : true))
              .filter((workout) =>
                workout.displayName
                  .toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase())
              )
              .map((workout) => (
                <div
                  className={`flex cursor-pointer flex-col items-start justify-center rounded-md bg-lighterGray py-2.5 px-4 text-sm
              `}
                  key={workout.id}
                >
                  <div className="flex items-center justify-center text-base font-medium">
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
        )}
      </div>
    </Layout>
  )
}

export default Exercises
