'use client'
import { UpdateName } from '@/redux/ReduxSlice'
import { TableUserNameProps } from '@/utils/Types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const TableUserName: React.FC<TableUserNameProps> = ({ username, index,Id }) => {
    const dispatch = useDispatch()
    const router=useRouter()
    const Agent = { username, Id }
    const handelUserName = () => {
        dispatch(UpdateName(Agent))
        router.push('/subordinates/players')
    }
    return (
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
    )
}

export default TableUserName
