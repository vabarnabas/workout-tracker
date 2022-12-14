import React, { Fragment, SyntheticEvent, useEffect, useState } from "react"
import Layout from "../../../components/layout"
import { useClient } from "workout-tracker-client"
import TokenService from "../../../services/token.service"
import { Plan, User } from "workout-tracker-client/dist/types"
import Spinner from "../../../components/spinner"
import { HiBadgeCheck, HiCheckCircle } from "react-icons/hi"
import { useRouter } from "next/router"

const PlanForm = () => {
  const tokenservice = new TokenService()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [description, setDescription] = useState("")
  const [query, setQuery] = useState("")
  const [plans, setPlans] = useState<Plan[]>([])
  const [error, setError] = useState("")
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const planData = await client.getPlans({ token })
      const userData = await client.getCurrentUser({ token })
      setPlans(planData)
      setCurrentUser(userData)
    }

    getData()
  }, [])

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setError("")
    if (selectedPlans.length === 0) {
      setError("Please select at least 1 category")
    } else {
      const token = await tokenservice.getToken()
      try {
        const collection = await client.createCollection({
          token,
          displayName,
          description,
          createdBy: currentUser.id,
          plans: [],
        })
        selectedPlans.forEach(async (plan) => {
          await client.connectCollection({
            token,
            id: collection.id,
            planId: plan,
          })
        })
        router.push("/collections")
      } catch {
        setError("Something went wrong")
      }
    }
  }

  const handleSelection = (id: string) => {
    selectedPlans.includes(id)
      ? setSelectedPlans(selectedPlans.filter((category) => category !== id))
      : setSelectedPlans([...selectedPlans, id])
  }

  return (
    <Layout>
      <div className="h-full w-full overflow-y-auto px-4 py-2">
        {plans.length === 0 ? (
          <Spinner />
        ) : (
          <form
            action=""
            onSubmit={(e) => onFormSubmit(e)}
            className="space-y-3"
          >
            <div className="">
              <p className="mb-0.5 pl-1 text-xs text-blue-400">
                Collection Name<span className="text-rose-500">*</span>
              </p>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                type="text"
                className="w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
                required
              />
            </div>
            <div className="">
              <p className="mb-0.5 pl-1 text-xs text-blue-400">
                Description<span className="text-rose-500">*</span>
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
                required
                rows={3}
              />
            </div>
            <div className="">
              <p className="mb-0.5 pl-1 text-xs text-blue-400">
                Plans<span className="text-rose-500">*</span>
              </p>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search..."
                className="mb-3 w-full rounded-md bg-lighterGray px-3 py-1.5 text-sm outline-none"
              />
              <div className="grid grid-cols-1 gap-x-3 gap-y-3">
                {plans
                  .filter((plan) =>
                    plan.displayName
                      .toLocaleLowerCase()
                      .includes(query.toLocaleLowerCase())
                  )
                  .sort((a, b) => a.displayName.localeCompare(b.displayName))
                  .map((plan) => (
                    <div
                      onClick={() => handleSelection(plan.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-md bg-lighterGray py-1.5 px-3 text-sm ${
                        selectedPlans.includes(plan.id)
                          ? "ring-1 ring-blue-400"
                          : ""
                      }`}
                      key={plan.id}
                    >
                      <div className="flex flex-col items-start">
                        <p className="flex items-center justify-center">
                          {plan.displayName}
                        </p>
                        {plan.workouts.length !== 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {plan.workouts.map((workout) => (
                              <p
                                key={workout.id}
                                className="rounded-md bg-lightGray px-3 py-1 text-center text-xs"
                              >
                                {workout.displayName}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      {selectedPlans.includes(plan.id) && (
                        <HiCheckCircle className="text-base text-blue-400" />
                      )}
                    </div>
                  ))}
              </div>
              {error && (
                <p className="mt-1.5 pl-1 text-xs text-rose-500">{error}</p>
              )}
            </div>
            <button className="w-full rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white outline-none hover:bg-blue-500">
              Create
            </button>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default PlanForm
