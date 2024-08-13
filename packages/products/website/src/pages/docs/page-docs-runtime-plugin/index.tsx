import { memo, type FC } from 'react'
import { DocsLayout } from '../../../components/docs-layout'
import Md from './md.mdx'

const PageDocs: FC = memo(() => {
  return (
    <DocsLayout>
      <Md />
    </DocsLayout>
  )
})

export default PageDocs
