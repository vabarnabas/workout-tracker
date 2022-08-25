import React from "react"
import { BiDumbbell } from "react-icons/bi"

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 flex h-12 items-center justify-between border-b bg-stone-100 px-4">
      <BiDumbbell className="cursor-pointer text-3xl text-lime-500" />
      <input
        type="text"
        className="w-[80%] rounded-md border py-1 px-3 text-sm outline-none"
        placeholder="Search..."
      />
    </div>
  )
}

export default Navbar
