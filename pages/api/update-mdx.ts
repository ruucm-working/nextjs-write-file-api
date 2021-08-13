import type { NextApiRequest, NextApiResponse } from "next"
// import { POSTS_PATH } from "../../utils/mdxUtils"
const path = require("path")
const fs = require("fs")
// const mdx = require("@mdx-js/mdx")
// const babel = require("babel-core")

type Data = {
  name: string
}

// console.log("POSTS_PATH", POSTS_PATH)
const posts_path = path.join(process.cwd(), "posts")
console.log("posts_path", posts_path)
const opts = {
  // dirname: POSTS_PATH,
  dirname: posts_path,
  // port: 7071,
  title: "mdx-editor",
  open: true,
  o: true,
  vim: false,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const noop = (err: any) => {}
  const updateFile =
    (opts: any) =>
    ({ filename, content }: any, cb = noop) => {
      const filepath = path.join(opts.dirname, filename)
      console.log("filepath!", filepath)
      if (!fs.existsSync(filepath)) return
      try {
        // const jsx = mdx.sync(content)
        // babel.transform(jsx, {
        //   presets: [
        //     "babel-preset-env",
        //     "babel-preset-stage-0",
        //     "babel-preset-react",
        //   ].map(require.resolve),
        // })
        fs.writeFile(filepath, content, cb)
      } catch (error) {
        console.log("error", error)
        // const err = {
        //   text: error.toString(),
        //   code: ansiHTML(entities.encode(e.codeFrame)),
        // }
        // cb(err)
      }
    }
  const update = updateFile(opts)

  const data = req.body
  console.log("data", data)
  update(data, (err) => {
    console.log("err (update)", err)
    // if (err) {
    //   const json = JSON.stringify({
    //     error: err,
    //   })
    //   socket.send(json)
    //   return
    // }
    // socket.send(JSON.stringify({ message: "saved" }))
  })

  res.status(200).json({ name: "John Doe" })
}
