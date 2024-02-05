'use client'
import Form from '@/components/Form'
import React from 'react'

const getTopicDetails = async (id: string) => {
    try {

        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`failed to fetch topic details of id ${id} `)
        }
        return res.json()
    } catch (err) {
        console.log('err', err)

    }
}
const page = async ({ params }: any) => {
    const { id } = params;
    const topic = await getTopicDetails(id);

    return (
        <Form data={{ mode: 'edit', topicDetails: topic?.topic }} />
    )
}

export default page