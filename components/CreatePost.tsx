"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"
import axios from "axios"
import { useState } from "react"



export default function CreatePost({creatorId, subredditId}: {creatorId: string | undefined, subredditId: string | undefined}) {
  const [error, setError] = useState("")
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title')
    const content = formData.get('content')
    if(!title || !content || !creatorId || !subredditId) return setError("All fields are required")
    const response = await axios.post("http://localhost:3000/api/post", {
      title,
      content,
      authorId: creatorId,
      subredditId
    })
    if(response.status === 201) {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }
  return (
    <form onSubmit={handelSubmit} className="w-full flex gap-y-4 flex-col">
      <div>
        <Input placeholder="Title" name="title" id="name" />
      </div>
      <div>
        <Input placeholder="Content" name="content" id="content" />
      </div>
      <Button>Submit</Button>
      <p className="text-red-500">{error}</p>
    </form>
  );
}
