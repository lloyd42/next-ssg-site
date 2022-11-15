import { User } from '@/interfaces'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(_req: NextApiRequest, res: NextApiResponse<User[]>) {
  const ret = await fetch('http://127.0.0.1:3001/user')
  const users = await ret.json()

  return res.status(200).json(users)
}
