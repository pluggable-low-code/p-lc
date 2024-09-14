import { memo, type FC } from 'react'
import { DocsLayout } from '../../../components/docs-layout'
import STR_MD from './md.md?raw'

const PageDocs: FC = memo(() => {
  return <DocsLayout md={STR_MD} />
})

export default PageDocs
