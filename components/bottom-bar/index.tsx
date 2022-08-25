import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { BiDumbbell } from "react-icons/bi"
import { MdOutlineStickyNote2 } from "react-icons/md"
import { RiUserSettingsFill } from "react-icons/ri"

const BottomBar = () => {
  const router = useRouter()

  const options = [
    {
      title: "Plans",
      slug: "plans",
      icon: <MdOutlineStickyNote2 />,
      action: () => {},
    },
    {
      title: "Exercises",
      slug: "exercises",
      icon: <BiDumbbell />,
      action: () => {},
    },
    {
      title: "Profile",
      slug: "profile",
      icon: <RiUserSettingsFill />,
      action: () => {},
    },
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 flex h-12 items-center justify-between gap-x-4 border-t bg-stone-100 px-4">
      {options.map((option) => (
        <div
          key={option.title}
          className={`flex w-full cursor-pointer flex-col items-center justify-center hover:text-lime-500 ${
            router.pathname.includes(option.slug) ? "text-lime-500" : ""
          }`}
        >
          {option.icon}
          <p className="mt-0.5 text-xs">{option.title}</p>
        </div>
      ))}
    </div>
  )
}

export default BottomBar
