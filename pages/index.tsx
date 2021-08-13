import fs from "fs"
import matter from "gray-matter"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
const path = require("path")
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils"
import Link from "next/link"

const Home: NextPage = ({ posts, postsPath }: any) => {
  console.log("postsPath", postsPath)
  return (
    <div className={styles.container}>
      {posts.map((post: any) => (
        <li key={post.filePath}>
          <Link
            as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
            href={`/posts/[slug]`}
          >
            <a>{post.data.title}</a>
          </Link>
        </li>
      ))}
      <button
        onClick={async () => {
          const filepath = path.join(__dirname, "./posts")
          console.log("filepath", filepath)

          const res = await fetch("/api/update-mdx", {
            body: JSON.stringify({
              filename: "hey.mdx",
              content: "content-4",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          })
        }}
      >
        write
      </button>
    </div>
  )
}

export default Home

export function getStaticProps() {
  console.log("POSTS_PATH (page)", POSTS_PATH)

  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts, postsPath: POSTS_PATH } }
}
