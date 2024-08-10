'use client'
import { RootState } from '@/utils/Types'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Close from '../svg/Close'
import { UpdateNotification } from '@/redux/ReduxSlice'

const Notifications = () => {
    const pathname = usePathname()
    const dispatch=useDispatch()
    const isNotification = useSelector((state: RootState) => state.globlestate.showNotification)
    return (
        pathname != '/'&&isNotification && <div className={`text-white border-l-[1px] ${isNotification?'col-span-2':' col-span-0'} border-[#282828]`}>
            <button onClick={()=>dispatch(UpdateNotification(false))}>
                <Close />
            </button>
       Notifications
    </div>
  )
}

export default Notifications
