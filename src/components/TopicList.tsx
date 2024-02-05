import React from 'react'
import RemoveBtn from './RemoveBtn';
import EditBtn from './EditBtn';

const getTopics: any = async () => {
    try {
        const result = await fetch('http://localhost:3000/api/topics', { cache: 'no-store' });
        // console.log('topics', await topics.json())
        if (!result.ok) {
            throw new Error("Failed to fetch topics")
        }
        return result.json()
    } catch (err) {
        console.log("error", err)
    }
}
const TopicList = async () => {
    const { topics, message } = await getTopics()
    return (
        <>
            {
                topics.map((topic: any) => (
                    < div key={topic._id} className='flex flex-row justify-between items-start p-2 border border-slate-300 my-3 gap-5' >
                        <div>
                            <h2 className='font-bold text-2xl'>{topic?.title}</h2>
                            <h3>{topic?.desc}</h3>
                        </div>
                        {/* .items-start {
                align-items: flex-start;
            }  so it is just a align-items*/}
                        <div className='flex gap-4 items-start'>
                            <RemoveBtn data={{ id: topic._id }} />
                            <EditBtn data={{ id: topic._id }} />
                        </div>
                    </div >
                ))
            }
        </>
    )
}

export default TopicList;