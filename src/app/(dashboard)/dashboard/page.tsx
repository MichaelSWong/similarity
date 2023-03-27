import { FC } from 'react'

import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import RequestApiKey from '@/components/RequestApiKey'
import ApikDashboard from '@/components/ApikDashboard'

export const metaData: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Free & open-source text similarity API',
}

const page = async () => {
  const user = await getServerSession(authOptions)
  if (!user) return notFound()

  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  })
  return (
    <div className='max-w-7xl mx-auto mt-16'>
      {apiKey ? <ApikDashboard /> : <RequestApiKey />}
    </div>
  )
}

export default page
