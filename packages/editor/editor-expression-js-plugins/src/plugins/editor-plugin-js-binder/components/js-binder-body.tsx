import type { StyleProps } from '@p-lc/react-shared'
import {
  MonacoJs,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import type { ValueOnChangeProps } from '@p-lc/shared'
import type { UidlExpression } from '@p-lc/uidl'
import {
  EXPRESSION_TYPE_JS,
  isJsExpression,
  type UidlExpressionJs,
} from '@p-lc/uidl-ext-js'
import { isUndefined } from 'lodash-uni'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'

/**
 * JS 绑定器主体属性
 */
export interface JsBinderBodyProps
  extends StyleProps,
    ValueOnChangeProps<UidlExpression | undefined> {}

/**
 * JS 绑定器主体
 */
export const JsBinderBody: FC<JsBinderBodyProps> = withStylePropsObserver(
  ({ value, onChange }) => {
    const expr: UidlExpressionJs | undefined = useMemo(() => {
      if (isJsExpression(value)) return value
    }, [value])
    const handleMonacoJsChange = useLatestFn((code?: string) => {
      onChange?.(
        isUndefined(code)
          ? code
          : {
              type: EXPRESSION_TYPE_JS,
              code,
            },
      )
    })
    return (
      <InternalJsBinderBodyContainer className="lc-js-binder-body">
        <MonacoJs value={expr?.code} onChange={handleMonacoJsChange} />
      </InternalJsBinderBodyContainer>
    )
  },
)

/**
 * 内部：JS 绑定器主体容器
 */
export const InternalJsBinderBodyContainer = styled.div`
  height: 100%;
  margin-right: 15px;
`
