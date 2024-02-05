'use Client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Form = ({ data }: any) => {
    const { mode, topicDetails } = data;
    const [t, setT] = useState({ title: topicDetails?.title, desc: topicDetails?.desc });
    const router = useRouter()

    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        let url = mode === 'edit' ? `http://localhost:3000/api/topics/${topicDetails?._id}` : 'http://localhost:3000/api/topics'
        let method = mode === 'edit' ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, {
                method,
                body: JSON.stringify(t)
            })

            if (res.ok) {
                // go to home page
                router.push('/')
                router.refresh()
            } else {
                throw new Error('err')
            }
        } catch (err) {
            console.log(err)
        }

    }

    const onChangeHandler = (e: any) => {
        const obj = { ...t, [e.target.name]: e.target.value }
        setT(obj)
    }
    return (
        <form className='flex flex-col space-y-2 mt-3' onSubmit={onSubmitHandler} >
            <label htmlFor='title'>Topic title</label>
            <input id='title' value={t?.title} onChange={onChangeHandler} required name='title' className='border border-slate-400 p-2' type='text' placeholder='Topic Title'></input>
            <label htmlFor='desc' >Topic description</label>
            <input id='desc' value={t?.desc} onChange={onChangeHandler} required name='desc' placeholder='Topic Desc' className='border border-slate-400 p-2'></input>
            <button type='submit'
                className='mt-2 p-1 border w-1/3 mx-auto flex justify-center items-center bg-slate-500'>{data?.mode === 'edit' ? `Update Topic` : 'Add Topic'}</button>
        </form>
    )
}

export default Form