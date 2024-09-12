import { memo, type FC } from 'react'
import { DocsLayout, mdxComponents } from '../../../components/docs-layout'
import Md from './md.mdx'

const PageDocs: FC = memo(() => {
  return (
    <DocsLayout>
      <Md components={mdxComponents} />
    </DocsLayout>
  )
})

export default PageDocs
