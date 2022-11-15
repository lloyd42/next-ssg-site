import UserComponent from '@/components/User'
import { Json, User } from '@/interfaces'
import Link from 'next/link'
import useSWR from 'swr'

// const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Home(json: Json) {
  // const { data, error } = useSWR('/api/people', fetcher)
  const { code, msg, data } = json
  // const ret = await fetch('http://127.0.0.1/user')
  // const users = await ret.json()

  const arr = [1, 2, 3, 4, 5, 6]

  if (code > 0) return <div>Failed to load: {msg}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <h1>This is Index Page.</h1>
      <ul>
        {data.map((user: User) => (
          <UserComponent key={user.id} user={user} />
        ))}
      </ul>
      <Link href='/about' legacyBehavior>
        here
      </Link>
    </>
  )
}

export default Home

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://127.0.0.1:3001/user')
  const json = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      ...json
    }
  }
}
