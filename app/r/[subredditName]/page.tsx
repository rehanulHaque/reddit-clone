import MyCommunities from "@/components/MyCommunities";
// import TopSubReddit from "@/components/TopSubReddit";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import CreatePost from "@/components/CreatePost";
import { PostTypes, SubredditTypes } from "@/types";
import Post from "@/components/Post";
import SubredditDetails from "@/components/SubredditDetails";

interface ParamsProps {
  params: {
    subredditName: string;
  };
}

export default async function page({ params }: ParamsProps) {
  const session = await auth();
  let creatorId;
if (session?.user?.email) {
  creatorId = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });
}
  const subredditId = await prisma.subreddit.findUnique({
    where: {
      name: params.subredditName,
    },
  }) as SubredditTypes;

  const response = (await prisma.post.findMany({
    where: {
      subredditId: subredditId?.id,
    },
  })) as PostTypes[];
  const createButton = () =>{
    if(session?.user?.email){
      return (
        <SheetTrigger className="flex gap-2 w-fit items-center justify-start bg-gray-700 py-2 px-2 rounded-md text-white">
          <Plus /> Create a post
        </SheetTrigger>
      )
    }else {
      return (
        <button className="bg-gray-700 py-2 px-2 rounded-md text-white w-fit">Login to create</button>
      )
    }
  }
  return (
    <main className="grid grid-cols-5 min-h-screen">
      <div>
        <MyCommunities />
      </div>
      <div className="w-full col-span-3 ">
        <div className="flex justify-between py-4 px-8">
          <h1 className="text-2xl font-bold">r/{params.subredditName}</h1>
          <Sheet>
            {createButton()}
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create a Subreddit</SheetTitle>
                <SheetDescription>
                  <CreatePost
                    creatorId={creatorId?.id}
                    subredditId={subredditId?.id}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <hr className="my-4" />
        <div>
          <div className="col-span-3 px-8">
            {response.length > 0 ? (
              response.map((post) => <Post key={post.id} {...post} authorName={session?.user?.name} />)
            ) : (
              <p>No posts yet</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <SubredditDetails details={subredditId} />
      </div>
    </main>
  );
}
