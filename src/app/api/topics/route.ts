import connectDB from "@/libs/db";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";
import { isEmpty } from 'lodash-es'

//get all topics
export const GET = async (req: NextRequest) => {
    await connectDB()
    try {
        const topics = await Topic.find();
        return new NextResponse(JSON.stringify({ topics, message: 'Succesfully fetched all topics' }), {
            status: 200
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ message: `Error while fetching topics and error is ${err}`, success: false }))
    }
}

//get particular topics

//add one topic at a time
export const POST = async (req: NextRequest) => {
    await connectDB();
    try {
        const body = await req.json()
        // if there is no default value then whatever(subset of fields) in payload that will only be in records so
        // if say there is only title in payload then dec will will not be in mongo record but if we defined default value then that default value will be inserted
        const { title = '', desc = '' } = body;

        const isTopicsExist = await Topic.findOne({ title });

        if (!isEmpty(isTopicsExist)) {
            return new NextResponse(JSON.stringify({ message: `Topic with title ${title} already exist` }))

        }

        const addTopic = await Topic.create({ title, desc });

        return new NextResponse(
            JSON.stringify(
                { addTopic, message: `Successfully topic  of title ${title} is created` }
            ), { status: 201 })

    } catch (err) {
        return new NextResponse(JSON.stringify({ message: `Error while creating topic and error is ${err}`, success: false }))
    }
}

// bulk addition of topics


//delete a topic
export const DELETE = async (req: NextRequest, { params }: any) => {
    await connectDB();
    // const { id } = params;

    // using search query->_?id:121
    const id = req.nextUrl.searchParams.get("id")
    try {
        const deletedTopic = await Topic.findByIdAndDelete(id);

        if (isEmpty(deletedTopic)) {
            return new NextResponse(JSON.stringify({ message: `Topic of id ${id} is does not exist.`, success: false }), { status: 400 });
        }
        return new NextResponse(JSON.stringify({ message: `Topic of id ${id} is deleted successfully.`, success: true }), { status: 200 });
    } catch {
        return new NextResponse(JSON.stringify({ message: `Error while deleting the topic of id ${id}`, success: false }), { status: 400 });

    }
}

//bulk delete

//bulk update
