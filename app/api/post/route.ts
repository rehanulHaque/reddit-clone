import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = await prisma.post.findMany();
        const authorIds = response.map((post) => {
            return post.authorId
        })
        const authorNames = await Promise.all(
            authorIds.map(async (id) => {
              const user = await prisma.user.findUnique({
                where: { id }
              });
              return user ? user.name : null;
            })
          );
          const newResponse = response.map((post, index) => {
            return {
              ...post,
              authorName: authorNames[index],
            };
          });
        return NextResponse.json(newResponse);
    } catch (error: any) {
        return NextResponse.json({
            message: error.message || "Something went wrong"
        }, {
            status: error.status || error.code || 500
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const {title, content, imageUrl, subredditId, authorId} = await request.json()
        if(!title || !content || !subredditId || !authorId) {
            return NextResponse.json({
                message: "All fields are required"
            }, {
                status: 400
            })
        }

        const response = await prisma.post.create({
            data: {
                title,
                content,
                imageUrl,
                subredditId,
                authorId
            }
        })

        return NextResponse.json({
            message: "Post created successfully",}, {
            status: 201});

    } catch (error: any) {
        return NextResponse.json({
            message: error.message || "Something went wrong"
        }, {
            status: error.status || error.code || 500
        })
    }
}