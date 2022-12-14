import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'

export async function getStaticProps() {
  const files = fs.readdirSync('posts')
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8')
    const { data: frontmatter } = matter(readFile)
    return {
      slug,
      frontmatter,
    }
  })

  const topLevelPosts = posts.filter((post) => post.frontmatter.topLevel)

  return {
    props: {
      topLevelPosts,
    },
  }
}

export default function Home({ topLevelPosts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
      {topLevelPosts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <Link href={`/post/${slug}`}>
            <a>
              <Image
                width={650}
                height={340}
                alt={frontmatter.topLeveLTitle}
                src={`/${frontmatter.socialImage}`}
              />
              <h1 className="p-4 text-emerald-400">
                {frontmatter.topLeveLTitle}
              </h1>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
