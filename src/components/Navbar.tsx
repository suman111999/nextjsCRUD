import Link from 'next/link'
import React from 'react'

const Navbar = () => {

    return (
        <nav className='flex justify-between items-center px-4 py-3 text-white bg-slate-800'>
            <Link href={'/'}>Topics</Link>
            <Link href={'/add'} className='p-2 bg-white text-slate-800'>Add Topic</Link>
        </nav>
    )
}

export default Navbar