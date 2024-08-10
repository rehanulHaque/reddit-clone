import { PostTypes } from "@/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";

export default function Post({
  content,
  createdAt,
  id,
  title,
  authorName,
}: {
  authorName: string | undefined | null;
  content: string;
  createdAt: Date;
  id: string;
  title: string;
}) {
  return (
    <div className="bg-white my-8 p-4 rounded-lg border border-black transition-all hover:bg-gray-100">
      <div className="flex gap-4 text-sm">
        <p>u/{authorName}</p>
        <p>{formatDistanceToNow(createdAt)}</p>
      </div>
      <hr className="my-2" />
      <div className="">
        <Link href={`/post/${id}`} className="text-xl font-semibold">
          {title}
        </Link>
        <p>
          {content.length > 100 ? content.substring(0, 100) + "..." : content}
        </p>
      </div>
    </div>
  );
}
