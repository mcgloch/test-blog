import redis from '@/lib/redis'
import Guestbook from '@/components/Guestbook'
import { PageSeo } from '@/components/SEO'
import Link from 'next/link'

export default function GuestbookPage() {
  return (
    <>
      <PageSeo
        title={'Guestbook – Thang Huu Vu'}
        description={'Share some wisdom with my future visitors.'}
        url={'https://thvu.dev/guestbook'}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Guestbook
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          An artifact of the 90's webs. Leave a comment below for my future blog readers. Feel free
          to write anything!
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This page is inspired by{' '}
          <Link href="https://leerob.io/guestbook">
            <a className="text-base font-medium leading-6 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
              Lee Robinson's guestbook.
            </a>
          </Link>
        </p>

        <Guestbook />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const entries = (await redis.hvals('guestbook'))
    .map((entry) => JSON.parse(entry))
    .sort((a, b) => b.id - a.id)

  return {
    props: {
      initialEntries: entries,
    },
    revalidate: 60,
  }
}
