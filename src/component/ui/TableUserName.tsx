import { TableUserNameProps } from '@/utils/Types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TableUserName: React.FC<TableUserNameProps> = ({ username, index, Id,Page}) => {
    return (
        <>
            <td
                key={index}
            >
                <Link href={Page==="Player"?`/Reports/coins/${username}`:`/Reports/${username}`} className="flex cursor-pointer items-center pb-3 justify-start space-x-2 py-4">
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
