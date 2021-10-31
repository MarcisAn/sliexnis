// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { VARIABLE } = process.env;
type Data = {
  name: string
  variable: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (VARIABLE) {
    res.status(200).json({ name: 'John Doe', variable: VARIABLE })    
  }
  else {
    res.status(404)
  }
}
