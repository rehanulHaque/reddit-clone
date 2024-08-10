import { SubredditTypes } from '@/types'
interface SubredditPropsTypes {
  details: SubredditTypes
}

export default function SubredditDetails({details}: SubredditPropsTypes) {
  return (
    <div className='bg-gray-400 p-3 min-h-screen'>
      <h1 className='text-xl font-semibold mb-2'>{details.name}</h1>
      <p className='text-sm text-gray-900'>{details.description}</p>
    </div>
  )
}
