import { User } from '@/interfaces'
import { NextApiResponse, NextApiRequest } from 'next'

type ResponseError = {
  message: string
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<User[] | ResponseError>) {
  const ret = await fetch('http://127.0.0.1:3001/user')
  const { data } = await ret.json()

  const { query } = _req
  const { id } = query
  const filtered = data.filter((u: User) => u.id === Number(id))

  return filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res.status(404).json({ message: `User with id: ${id} not found.` })
}
