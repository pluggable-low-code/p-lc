import MarkdownPreview from '@uiw/react-markdown-preview'
import { memo, type FC } from 'react'
import { DocsLayout } from '../../../components/docs-layout'
import STR_MD from './md.md?raw'

const PageDocs: FC = memo(() => {
  return (
    <DocsLayout>
      <MarkdownPreview source={STR_MD} />
    </DocsLayout>
  )
})

export default PageDocs
