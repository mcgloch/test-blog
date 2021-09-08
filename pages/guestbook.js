import db from '@/lib/planetscale'
import Guestbook from '@/components/Guestbook'
import siteMetadata from '@/data/siteMetadata'
import { PageSeo } from '@/components/SEO'
import Link from 'next/link'

export default function GuestbookPage() {
  return (
    <>
      <PageSeo
        title={`Guestbook – ${siteMetadata.author}`}
        description={'Share some wisdom with my future visitors.'}
        url={'https://thvu.dev/guestbook'}
      />
      <div className="divide-y">
        <div className="flex flex-col justify-center items-start max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Guestbook
          </h1>
        </div>
        <div className="flex flex-col item-center gap-4 pt-8 pb-8">
          <p className="text-lg text- text-gray-600 dark:text-gray-400 xl:text-xl">
            An artifact of the 90's webs. Leave a comment below for my future visitors. Feel free to
            write anything!
          </p>
          <Guestbook />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-dark">
        This page is inspired by{' '}
        <Link href="https://leerob.io/guestbook">
          <a className="text-sm font-semibold">Lee Robinson's guestbook.</a>
        </Link>
      </p>
    </>
  )
}

export async function getStaticProps() {
  const [rows] = await db.query(`
    SELECT * FROM guestbook
    ORDER BY updated_at DESC;
  `)

  const entries = Object.values(JSON.parse(JSON.stringify(rows)))

  return {
    props: {
      initialEntries: entries,
    },
    revalidate: 60,
  }
}
