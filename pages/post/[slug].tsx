import fs from 'fs'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import mark from 'markdown-it-mark'
import container from 'markdown-it-container'
import iframe from 'markdown-it-iframe'
const md = markdownIt()
  .use(highlightjs)
  .use(mark)
  .use(container, 'info')
  .use(iframe, {
    allowfullscreen: true,
    width: 400,
    height: 400,
  })
import { GetStaticProps, GetStaticPaths } from 'next'

//https://medium.com/swlh/build-sidebar-navigation-in-next-js-with-tailwindcss-3619b6b42e17
//https://github.com/MatthewCaseres/markdownbooks.com/blob/main/pages/%5B...id%5D.js

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('posts')
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fileName = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8')
  const { data: frontmatter, content } = matter(fileName)
  return {
    props: {
      frontmatter,
      content,
    },
  }
}

export default function PostPage({ frontmatter, content }) {
  return (
    <div className="prose mx-auto">
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </div>
  )
}
