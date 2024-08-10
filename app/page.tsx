import Post from "@/components/Post";
import { PostTypes } from "@/types";
import axios from "axios";
import TopSubReddit from "@/components/TopSubReddit";
import MyCommunities from "@/components/MyCommunities";

interface NewPostTypes extends PostTypes {
  authorName: string;
}

export default async function Home() {
  const response = (await axios.get("http://localhost:3000/api/post")) as {
    data: NewPostTypes[];
  };
  return (
    <main className="grid grid-cols-5 min-h-screen">
      <MyCommunities/>
      <div className="col-span-3 px-8">
        {response.data.length > 0 ? (
          response.data.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <p>No posts yet</p>
        )}
      </div>
      <TopSubReddit/>
    </main>
  );
}
