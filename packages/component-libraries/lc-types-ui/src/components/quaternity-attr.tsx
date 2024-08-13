import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import {
  TypographyParagraph,
  useLatestFn,
  withStylePropsMemo,
} from '@p-lc/react-shared'
import { mathMin, type ValueOnChangeProps } from '@p-lc/shared'
import { isString, last } from 'lodash-uni'
import { memo, useId, useMemo, type ComponentProps, type FC } from 'react'
import styled from 'styled-components'
import type { AttrWrapperPropsBase } from '../shared'
import {
  AttrWrapper,
  splitAttrWrapperPropsBase,
  useStaticValueOnChange,
} from '../shared'

/**
 * 四合一属性（Attribute）属性
 */
export interface QuaternityAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    LcTypesValueOnChange {}

/**
 * 四合一属性
 */
export const QuaternityAttr: FC<QuaternityAttrProps> = withStylePropsMemo(
  (props) => {
    const [baseProps, restProps] = splitAttrWrapperPropsBase(props)
    const transformedProps = useStaticValueOnChange(restProps, isString, true)
    const { value: transformedValue, onChange: transformedOnChange } =
      transformedProps
    const recipeId = useId()
    const quaternityValue = transformedValue
    const handleQuaternityOnChange = useLatestFn((newValue?: string) => {
      transformedOnChange?.(newValue, {
        recipeId,
      })
    })
    return (
      <AttrWrapper {...baseProps} className="lc-color-attr">
        <Quaternity
          value={quaternityValue}
          onChange={handleQuaternityOnChange}
        />
      </AttrWrapper>
    )
  },
)

/**
 * 四合一属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface QuaternityProps extends ValueOnChangeProps<string | undefined> {}

/**
 * 四合一
 */
const Quaternity: FC<QuaternityProps> = memo(
  ({ value: rawValue, onChange: rawOnChange }) => {
    const rawValues = useMemo(() => {
      const parts = (rawValue || '').trim().split(/\s+/)
      while (parts.length < 4) parts.push('')
      parts.length = 4
      return parts as [string, string, string, string]
    }, [rawValue])
    const values = useMemo(() => {
      const [v0, v1, v2, v3] = rawValues
      return [v0, v1 || v0, v2 || v0, v3 || v1 || v0] as const
    }, [rawValues])
    // const onChanges = values.map(() => useLatestFn(() => {}))
    return (
      <InternalQuaternityContainer>
        {values.map((v, i) => {
          // values 定长，所以这里可以用 hooks
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const onChange = useLatestFn((newV: string) => {
            const newValues = [...rawValues]
            while (newValues.length && !last(newValues)?.length) {
              newValues.pop()
            }
            if (newV) {
              const isEmpty = !newValues.length
              while (newValues.length <= i) {
                newValues.push(isEmpty ? newV : values[newValues.length])
              }
              newValues[i] = newV
            } else {
              newValues.length = mathMin(i, newValues.length)
            }
            rawOnChange?.(newValues.length ? newValues.join(' ') : undefined)
          })
          const rawV = rawValues[i]
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const editable = useMemo(
            () =>
              ({
                triggerType: ['text'],
                onChange,
                text: rawV,
              }) satisfies ComponentProps<
                typeof TypographyParagraph
              >['editable'],
            [onChange, rawV],
          )
          return (
            <TypographyParagraph
              key={i}
              type={v === rawValues[i] ? undefined : 'secondary'}
              editable={editable}
            >
              {v || '-'}
            </TypographyParagraph>
          )
        })}
      </InternalQuaternityContainer>
    )
  },
)

/**
 * 内部：四合一容器
 */
const InternalQuaternityContainer = styled.div`
  width: 100%;
  height: ${32 * 3}px;
  position: relative;

  > .ant-typography {
    text-align: center;
    margin: 0;
    position: absolute;

    &:nth-child(1) {
      inset: 0 25% ${32 * 2}px;
    }

    &:nth-child(2) {
      inset: 32px 0 32px 50%;
    }

    &:nth-child(3) {
      inset: ${32 * 2}px 25% 0;
    }

    &:nth-child(4) {
      inset: 32px 50% 32px 0;
    }
  }
`
