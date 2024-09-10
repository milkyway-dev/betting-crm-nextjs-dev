"use client"
import React, { useState } from 'react'
import Modal from './Modal'

const ResolveButton = ({id}: {id: string}) => {
    const [open, setOPen] = useState(false)
    const [Id,setId]=useState('')
    const handelClose = () => {
        setOPen(false);
    };
    const handelOpen = async(id: string) => {
        setOPen(true);
        setId(id)
    };
    return (
        <>
            <button onClick={()=>handelOpen(id)} className="bg-black px-6 py-[6px]  rounded-xl">Resolve</button>
            <Modal betId={Id} isOpen={open} Type={'resolve'} onClose={handelClose} />
        </>
    )
}

export default ResolveButton
