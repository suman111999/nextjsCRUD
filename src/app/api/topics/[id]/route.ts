import connectDB from "@/libs/db";
import Topic from "@/models/topic";
import { isEmpty } from "lodash-es";
import { NextRequest, NextResponse } from "next/server";

//update a topic
export const PUT = async (req: NextRequest, { params }: any) => {
    await connectDB()
    try {
        const { id } = params;
        const { title, desc } = await req.json()
        const isTopicExist = await Topic.findById(id);

        if (isEmpty(isTopicExist)) {
            return new NextResponse(JSON.stringify({ success: false, message: `Topic of id ${id} does not exist in database` }), { status: 400 })
        }

        const updateTopic = await Topic.findByIdAndUpdate(id, { title, desc }, {
            new: true, //return updated docs
            // upsert: true ->if id does not present then add new documents
        });

        return new NextResponse(JSON.stringify({ updateTopic, message: `Successfully updated the topic with title ${title}` }), { status: 200 })

    } catch (err) {
        return new NextResponse(JSON.stringify({ message: `Error while updating the topic and error is ${err}` }), { status: 400 })
    }
}

export const GET = async (req: NextRequest, { params }: any) => {
    await connectDB();
    const { id } = params;

    try {
        const topic = await Topic.findById(id);

        if (isEmpty(topic)) {
            return new NextResponse(JSON.stringify({ message: `Topic of id ${id} does not exist.`, success: false }), { status: 400 })
        }
        return new NextResponse(JSON.stringify({ topic, message: `Successfully fetched details of topic with id ${id}`, success: true }), { status: 200 })

    } catch {
        return new NextResponse(JSON.stringify({ message: `Error while fetching details of topic with id ${id}`, success: false }), { status: 400 })
    }
};

//get particular topics