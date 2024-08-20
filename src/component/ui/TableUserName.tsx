// 'use client'
// import { UpdateName } from '@/redux/ReduxSlice'
import { TableUserNameProps } from '@/utils/Types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { useDispatch } from 'react-redux'

const TableUserName: React.FC<TableUserNameProps> = ({ username, index, Id,Page}) => {
    // const dispatch = useDispatch()
    // const Agent = { username, Id }
    // const handelUserName = () => {
    //     dispatch(UpdateName(Agent))
    // }
    return (
        <>
            <td
                // onClick={handelUserName}
                key={index}
            >
                <Link href={Page==="Player"?`/Reports/coins/${username}`:`/Reports/${username}`} className="flex cursor-pointer items-center pb-3 justify-center space-x-2 py-4">
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

                </Link>

            </td>
        </>
    )
}

export default TableUserName
