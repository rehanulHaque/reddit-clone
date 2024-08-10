"use client"
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function CreateSubReddit({creatorId}: {creatorId: string | undefined}) {
  const [error, setError] = useState("")
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const description = formData.get('description')

    if(!name || !description || !creatorId) return setError("All fields are required")

    const response = await axios.post("http://localhost:3000/api/subreddit", {
      name,
      description,
      creatorId
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
        <Input placeholder="Name" name="name" id="name" />
      </div>
      <div>
        <Input placeholder="Description" name="description" id="description" />
      </div>
      <Button>Submit</Button>
      <p className="text-red-500">{error}</p>
    </form>
  );
}
