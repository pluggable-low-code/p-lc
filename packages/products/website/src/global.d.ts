declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * Node.js 运行环境
     */
    NODE_ENV: 'development' | 'production' | 'test'
    /**
     * 低代码语言，依赖打包器摇树预处理
     *
     * * 为内置语言（当前内置语言：en-US、zh-CN）时：只打包内置语言的资源
     * * 为其他语言时：不打包任何内置语言的资源
     * * 不设置时：打包所有内置语言的资源，可以在运行的时候动态决定用哪个语言
     */
    LC_LANGUAGE?: string
  }
}

declare module '*.webp' {
  const url: string
  export default url
}

// declare module '*.mdx' {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const C: (props: any) => JSX.Element
//   export default C
// }

declare module '*?raw' {
  const txt: string
  export default txt
}
