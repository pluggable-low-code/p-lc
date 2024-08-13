import { useEditor } from '@p-lc/editor'
import { ClassicalLayout } from '@p-lc/editor-classical-layout-plugins'
import type { StyleProps } from '@p-lc/react-shared'
import { TypographyTitleSmall5, withStylePropsMemo } from '@p-lc/react-shared'
import { VCVN_COLOR_BORDER } from '@p-lc/shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { LcTypesEditor } from '../../../types'
import { I18N_KEY_CD } from '../i18n'
import { CdTabs } from './cd-tabs'
import { MetadataDialog } from './metadata-dialog'

/**
 * 低代码类型布局
 */
export const LcTypesLayout: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    i18nStore: { t },
  } = useEditor<LcTypesEditor>()
  return (
    <InternalLcTypesLayoutContainer className="lc-types-layout">
      <div className="lc-types-left">
        <TypographyTitleSmall5>{t(I18N_KEY_CD)}</TypographyTitleSmall5>
        <MetadataDialog />
        <CdTabs />
      </div>
      <ClassicalLayout />
    </InternalLcTypesLayoutContainer>
  )
})

/**
 * 内部：低代码类型布局容器
 */
export const InternalLcTypesLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .lc-types-left {
    flex: none;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${VCVN_COLOR_BORDER};
    width: 210px;
    height: 100%;
  }

  .lc-cd-tabs {
    height: 0;
    flex: auto;
  }
`
