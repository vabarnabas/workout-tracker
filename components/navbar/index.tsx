import { useB3nchClient } from "@b3nch/client"
import { SearchResponse } from "@b3nch/client/dist/types"
import { Combobox } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { BiDumbbell } from "react-icons/bi"
import TokenService from "../../services/token.service"

const Navbar = () => {
  const { search } = useB3nchClient(process.env.NEXT_PUBLIC_API_URL || "")
  const tokenService = new TokenService()
  const [query, setQuery] = useState("")
  const [queryResult, setQueryResult] = useState<SearchResponse[]>([])
  const [selectedQuery, setSelectedQuery] = useState("")

  useEffect(() => {
    const fetchSearch = async () => {
      setQueryResult(await search({ token: tokenService.getToken(), query }))
    }

    if (query.length >= 2) {
      fetchSearch()
    }
  }, [query])

  return (
    <div className="fixed inset-x-0 flex h-12 items-center justify-between gap-x-4 border-b bg-stone-100 px-4">
      <BiDumbbell className="cursor-pointer text-3xl text-lime-500" />
      <Combobox value={selectedQuery} onChange={setSelectedQuery}>
        <div className="relative w-full">
          <Combobox.Input
            className="w-full rounded-md border bg-white py-1 px-2 text-sm outline-none"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Combobox.Options className="absolute top-[100%] w-full overflow-hidden rounded-b-md bg-white shadow">
            {queryResult.map((result) => (
              <Combobox.Option className="" key={result.id} value={result.id}>
                {({ selected, active }) => (
                  <div
                    className={`cursor-pointer px-2 py-1 text-sm ${
                      active ? "bg-lime-500 text-white" : ""
                    }`}
                  >
                    <p className="">
                      {result.displayName}
                      <span
                        className={`${
                          active ? "text-slate-100" : "text-slate-400"
                        }`}
                      >{` in ${result.group}`}</span>
                    </p>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}

export default Navbar
