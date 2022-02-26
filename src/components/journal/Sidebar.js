import React from 'react'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
  return (
    <aside className='journal__sidebar'>
        <div className='journal__sidebar-navbar'>
            <h3 className='mt-5'>
                <i className='fa-regular fa-moon'></i>
                <span> Jesus</span>
            </h3>

            <button className='btn'>
                Logout
            </button>
        </div>
        <div className='journal__new-entry'>
        <i className="fa-regular fa-calendar-plus fa-4x"></i>
            <p className='mt-5'>
                New Entry
            </p>
        </div>

        <JournalEntries />
    </aside>
  )
}