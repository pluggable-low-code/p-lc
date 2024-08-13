import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import {
  MonacoJsonModal,
  useSwitchableRefs,
  withStylePropsMf,
} from '@p-lc/react-shared'
import type { ButtonProps } from 'antd'
import { useState } from 'react'
import type { AttrWrapperPropsBase } from '../shared'
import {
  AttrWrapper,
  ClearBtn,
  splitAttrWrapperPropsBase,
  useStaticValueOnChange,
} from '../shared'

/**
 * JSON 属性（Attribute）属性
 */
export interface JsonAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    LcTypesValueOnChange {}

/**
 * 打开按钮属性
 */
const openButtonProps: ButtonProps = {
  size: 'small',
}

/**
 * JSON 属性
 */
export const JsonAttr = withStylePropsMf<JsonAttrProps, HTMLDivElement>(
  (props, ref) => {
    const [baseProps, restProps] = splitAttrWrapperPropsBase(props)
    const transformedProps = useStaticValueOnChange(restProps)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [handleWrapperRef, hanldeModalRef] = useSwitchableRefs(
      ref,
      isModalOpen,
    )
    return (
      <AttrWrapper
        {...baseProps}
        className="lc-string-attr"
        ref={handleWrapperRef}
      >
        <MonacoJsonModal
          openButtonProps={openButtonProps}
          onVisibleChange={setIsModalOpen}
          ref={hanldeModalRef}
          {...transformedProps}
        />
        <ClearBtn {...restProps} />
      </AttrWrapper>
    )
  },
)
