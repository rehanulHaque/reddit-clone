import { prisma } from '@/db/prisma'
import { SubredditTypes } from '@/types'
import Link from 'next/link'
import React from 'react'

export default async function TopSubReddit() {
    const subredditsList = await prisma.subreddit.findMany() as SubredditTypes[]
  return (
    <div className="bg-gray-400 p-3 min-h-screen">
        <h1 className="text-xl pb-4">Subreddits</h1>
        <div className="flex flex-col gap-2">
          {subredditsList.map((subreddit: SubredditTypes) => (
            <Link href={`/r/${subreddit.name}`} className="bg-white w-full rounded-md py-2 px-2" key={subreddit.id}>{subreddit.name}</Link>
          ))}
        </div>
      </div>
  )
}
