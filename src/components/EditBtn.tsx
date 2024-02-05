import Link from 'next/link'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'

const EditBtn = ({ data: { id } }: any) => {

    return (
        <Link href={`/edit/${id}`}>
            <HiPencilAlt size={24} />
        </Link>
    )
}

export default EditBtn