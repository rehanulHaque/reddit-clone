import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse){
    try {
        const {name, description, creatorId} = await request.json();
        if(!name || !creatorId) {
            return NextResponse.json({
                message: "All fields are required"
            }, {
                status: 400
            })
        }

        const response = await prisma.subreddit.create({
            data: {
                name,
                description,
                creatorId
            }
        })

        if(!response.name){
            return NextResponse.json({
                message: "Failed to created"
            }, {
                status: 400
            })
        }
        return NextResponse.json({
            message: "Subreddit created successfully"
        }, {
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message || "Something went wrong"
        }, {
            status: error.status || error.code || 500
        })
    }
}

// export async function GET(request: NextResponse) {
//     try {
//         const {subredditId} = await request.json();
//         const response = await prisma.post.findMany({
//             where: {
//                 subredditId
//             }
//         });
//         return NextResponse.json(response);
//     } catch (error: any) {
//         return NextResponse.json({
//             message: error.message || "Something went wrong"
//         }, {
//             status: error.status || error.code || 500
//         })
//     }
// }