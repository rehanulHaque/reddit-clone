import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import CreateSubReddit from "./CreateSubReddit";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
export default async function MyCommunities() {
  const session = await auth();
  let creatorId;
if (session?.user?.email) {
  creatorId = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });
}
  const createButton = () =>{
    if(session?.user?.email){
      return (
        <SheetTrigger className="flex gap-2 w-full items-center justify-start bg-gray-700 py-2 px-2 rounded-md text-white">
          <Plus /> Create Subreddit
        </SheetTrigger>
      )
    }else {
      return (
        <button className="bg-gray-700 py-2 px-2 rounded-md text-white w-full">Login to create</button>
      )
    }
  }
  return (
    <div className="bg-gray-400 p-3 min-h-screen">
      <Sheet>
        {createButton()}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create a Subreddit</SheetTitle>
            <SheetDescription>
              {session?.user?.email && <CreateSubReddit creatorId={creatorId?.id} />}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <h1>Communities</h1>
    </div>
  );
}
