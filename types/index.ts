export interface PostTypes {
    id: string,
    title: string,
    content: string,
    imageUrl: string,
    subredditId: string,
    authorId: string
    createdAt: Date
}

export interface SubredditTypes {
    id: string,
    name: string,
    description: string,
    creatorId: string,
    createdAt: Date
}