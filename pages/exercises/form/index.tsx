import React, { Fragment, SyntheticEvent, useEffect, useState } from "react"
import Layout from "../../../components/layout"
import { useClient } from "workout-tracker-client"
import TokenService from "../../../services/token.service"
import { Category } from "workout-tracker-client/dist/types"
import Spinner from "../../../components/spinner"
import { HiCheckCircle } from "react-icons/hi"
import { useRouter } from "next/router"

const ExerciseForm = () => {
  const tokenservice = new TokenService()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const data = await client.getCategories({ token })
      setCategories(data)
    }

    getData()
  }, [])

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setError("")
    if (selectedCategories.length === 0) {
      setError("Please select at least 1 category")
    } else {
      const token = await tokenservice.getToken()
      try {
        const workout = await client.createWorkout({
          token,
          displayName,
          verified: false,
        })
        selectedCategories.forEach(async (category) => {
          await client.connectWorkout({
            token,
            id: workout.id,
            categoryId: category,
          })
        })
        router.push("/exercises")
      } catch {
        setError("Something went wrong")
      }
    }
  }

  const handleSelection = (id: string) => {
    selectedCategories.includes(id)
      ? setSelectedCategories(
          selectedCategories.filter((category) => category !== id)
        )
      : setSelectedCategories([...selectedCategories, id])
  }

  return (
    <Layout>
      <div className="h-full w-full px-4 py-2">
        {categories.length === 0 ? (
          <Spinner />
        ) : (
          <form
            action=""
            onSubmit={(e) => onFormSubmit(e)}
            className="space-y-3"
          >
            <div className="">
              <p className="mb-0.5 pl-1 text-xs text-blue-400">
                Exercise Name<span className="text-rose-500">*</span>
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
                Categories<span className="text-rose-500">*</span>
              </p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                {categories
                  .sort((a, b) => a.displayName.localeCompare(b.displayName))
                  .map((category) => (
                    <div
                      onClick={() => handleSelection(category.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-md bg-lighterGray py-1.5 px-3 text-sm ${
                        selectedCategories.includes(category.id)
                          ? "ring-1 ring-blue-400"
                          : ""
                      }`}
                      key={category.id}
                    >
                      <p className="">{category.displayName}</p>
                      {selectedCategories.includes(category.id) && (
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

export default ExerciseForm
