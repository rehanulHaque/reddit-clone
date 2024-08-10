import MyCommunities from '@/components/MyCommunities'
import TopSubReddit from '@/components/TopSubReddit'
import { Button } from '@/components/ui/button';
import { prisma } from '@/db/prisma';
import { ArrowBigLeft, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ParamsProps {
  params: {
    postId: string;
  };
}

export default async function page({params}: ParamsProps) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postId
    }
  })
  const subRedditName = await prisma.subreddit.findUnique({
    where:{
      id: post?.subredditId
    }
  })
  return (
    <main className='grid grid-cols-5 min-h-screen'>
        <div><MyCommunities/></div>
        <div className='col-span-3 py-6 px-8'>
          <div className=' flex gap-3 items-center'>
            <Link href={"/"}><Button variant={"outline"}><ArrowLeft/></Button></Link>
            <Link href={`/r/${subRedditName?.name}`}>r/{subRedditName?.name}</Link>
          </div>
          <hr className='my-4' />
          <div>
            <h1 className='text-2xl font-bold'>{post?.title}</h1>
            <p className='mt-3'>{post?.content}</p>
          </div>
        </div>
        <div><TopSubReddit/></div>
    </main>
  )
}
