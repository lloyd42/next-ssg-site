import { Json, User } from '@/interfaces'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

function UserDetail(json: Json) {
  // const { data, error } = useSWR('/api/people', fetcher)
  const { code, msg, data } = json
  // const ret = await fetch('http://127.0.0.1/user')
  // const users = await ret.json()
  if (code > 0) return <div>Failed to load: {msg}</div>
  if (!data) return <div>Loading...</div>

  return (
    <p>
      {data.id}/{data.name}/{data.email}
    </p>
  )
}

export default UserDetail

export async function getStaticProps({ params }: GetStaticPropsContext) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`http://127.0.0.1:3001/user/${params?.id}`)
  const json = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      ...json
    }
  }
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking'
    }
  }

  // Call an external API endpoint to get posts
  const res = await fetch('http://127.0.0.1:3001/user')
  const { data } = await res.json()

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = data.map((user: User) => ({
    params: { id: user.id.toString() }
  }))

  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}
