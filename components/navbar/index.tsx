import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, useEffect, useState } from "react"
import {
  HiChevronDown,
  HiCollection,
  HiFolder,
  HiIdentification,
  HiLockClosed,
} from "react-icons/hi"
import { BiDumbbell } from "react-icons/bi"
import { FaStickyNote } from "react-icons/fa"

const Navbar = () => {
  const menuOptions = [
    { title: "Plans", action: () => {}, active: true, icon: <HiCollection /> },
    {
      title: "Exercises",
      action: () => {},
      active: true,
      icon: <HiFolder />,
    },
    {
      title: "Profile",
      action: () => {},
      active: true,
      icon: <HiIdentification />,
    },
    {
      title: "Logout",
      action: () => {},
      active: true,
      icon: <HiLockClosed />,
    },
  ]

  return (
    <div className="fixed inset-x-0 top-0 flex h-12 items-center justify-between gap-x-4 bg-lighterGray px-4">
      <div className="flex cursor-pointer items-center justify-center">
        <BiDumbbell className="text-3xl text-blue-400" />
        <p className="ml-2 font-medium">Workout Tracker</p>
      </div>
      <div className="z-20 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full items-center justify-center rounded-md bg-black bg-opacity-20 px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <HiChevronDown className="mr-1 text-base" />
              Menu
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-md bg-lightGray shadow-lg focus:outline-none">
              {menuOptions.map((option) => (
                <div key={option.title} className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-400 " : ""
                        } group flex w-full items-center rounded-md px-2 py-1.5 text-sm text-slate-100`}
                      >
                        <span className="mr-2 text-sm">{option.icon}</span>
                        <p className="">{option.title}</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {/* <div className="flex space-x-3 text-sm text-blue-400">
        {menuOptions
          .filter((option) => option.active)
          .map((option) => (
            <p
              key={option.title}
              className="cursor-pointer hover:text-blue-500"
            >
              {option.title}
            </p>
          ))}
      </div> */}
      {/* <Combobox value={selectedQuery} onChange={setSelectedQuery}>
        <div className="relative w-full">
          <Combobox.Input
            className="w-full rounded-md bg-lightGray py-1 px-2 text-sm outline-none"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length > 2 && (
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
          )}
        </div>
      </Combobox> */}
    </div>
  )
}

export default Navbar
