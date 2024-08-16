'use client'
import { UpdateName } from '@/redux/ReduxSlice'
import { TableUserNameProps } from '@/utils/Types'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from './Modal'

const TableUserName: React.FC<TableUserNameProps> = ({ username, index, Id, Page }) => {
    const [state, setState] = useState(false)
    const dispatch = useDispatch()
    const Agent = { username, Id }
    const handelUserName = () => {
        dispatch(UpdateName(Agent))
        setState(true)
    }
    const onClose = () => {
        setState(false)
    }
  const tabsAgent = ['Players', 'Coins']
  const tabsPlayer = ['Coins','Betting']


    return (
        <>
            <td
                onClick={handelUserName}
                key={index}
                className="flex cursor-pointer items-center pb-3 justify-center space-x-2 pt-6"
            >
                <div>
                    <Image
                        alt="profile"
                        src={"/assets/images/profile.png"}
                        width={200}
                        height={200}
                        className="w-[30px] border-[2px] border-[#858585] rounded-full"
                    />
                </div>
                <span>{username}</span>
            </td>
            <Modal isOpen={state} Tabs={Page==="agent"?tabsAgent:tabsPlayer} Type={'Report'} onClose={onClose} data={''} />
        </>
    )
}

export default TableUserName
