'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'


const RemoveBtn = ({ data: { id } }: any) => {

    const router = useRouter()
    const onClickHandler = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                router.refresh()
            }


        } catch (err) {
            console.log(err)
        }
    }
    return (
        <button onClick={onClickHandler} className='text-red-500'>
            <HiOutlineTrash size={24} />
        </button>
    )
}

export default RemoveBtn