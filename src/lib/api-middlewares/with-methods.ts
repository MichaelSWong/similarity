import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

// Helper (HOF) function to make sure our routes take only certain methods

export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!req.method || !methods.includes(req.method)) {
      return res.status(405).end()
    }
    return handler(req, res)
  }
}
