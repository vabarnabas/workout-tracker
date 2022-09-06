import { Switch } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {
  HiBadgeCheck,
  HiChevronDown,
  HiChevronUp,
  HiPlus,
  HiPlusSm,
} from "react-icons/hi"
import { useClient } from "workout-tracker-client"
import { Plan } from "workout-tracker-client/dist/types"
import Layout from "../../components/layout"
import TokenService from "../../services/token.service"

const Plans = () => {
  const router = useRouter()
  const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")
  const tokenservice = new TokenService()
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState("")
  const [enabled, setEnabled] = useState(false)

  const handleSelection = (id: string) => {
    selectedPlan.includes(id) ? setSelectedPlan("") : setSelectedPlan(id)
  }

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const data = await client.getPlans({ token })
      setPlans(data)
    }

    getData()
  }, [])

  return (
    <Layout>
      <div className="h-full w-full px-4 py-2">
        <div className="mb-4 flex w-full items-center justify-between">
          <div
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
          </div>
          <button
            onClick={() => router.push("/plans/form")}
            className="flex items-center justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white outline-none hover:bg-blue-500"
          >
            <HiPlusSm className="mr-1" />
            New Plan
          </button>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-3">
          {plans
            .sort((a, b) => a.displayName.localeCompare(b.displayName))
            .map((plan) => (
              <div
                onClick={() => {
                  handleSelection(plan.id)
                }}
                className={`flex cursor-pointer flex-col items-start justify-center rounded-md bg-lighterGray py-2.5 px-4 text-sm
                  `}
                key={plan.id}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="">
                    <p className="text-base font-medium">{plan.displayName}</p>
                    <p className="text-xs font-light opacity-60">{`@${
                      plan.user && plan.user.handle
                    }`}</p>
                  </div>
                  {selectedPlan === plan.id ? (
                    <HiChevronUp className="text-xl" />
                  ) : (
                    <HiChevronDown className="text-xl" />
                  )}
                </div>
                {selectedPlan === plan.id && plan.workouts.length !== 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {plan.workouts.map((category) => (
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

export default Plans
