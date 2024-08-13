import type {
  ExpressionEvaluator,
  RuntimeDefaultPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { UidlExpressionI18n, UidlExtI18n } from '@p-lc/uidl-ext-i18n'
import { EXPRESSION_TYPE_I18N } from '@p-lc/uidl-ext-i18n'
import { get } from 'lodash-uni'

/**
 * 运行时国际化插件属性扩展
 */
export interface RuntimePluginI18nPropertiesExt {
  runtime: {
    /**
     * UIDL
     */
    uidl: UidlExtI18n
    /**
     * （当前）语言
     */
    language: string
    /**
     * 翻译
     * @param key 键值
     */
    t(key: string): string
  }
}

/**
 * 国际化表达式求值器
 */
export const i18nExpressionEvaluator: ExpressionEvaluator<
  UidlExpressionI18n,
  unknown,
  RuntimeDefaultPlugin | typeof runtimePluginI18n
> = {
  type: EXPRESSION_TYPE_I18N,
  eval(expr, ctx) {
    return ctx.root.t(expr.key)
  },
}

/**
 * 运行时国际化插件
 */
export const runtimePluginI18n: RuntimePlugin<RuntimePluginI18nPropertiesExt> =
  {
    id: 'i18n',
    initRuntime(ctx) {
      ctx.language = process.env.LC_LANGUAGE || ''
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ctx.t = (key) => {
        const {
          uidl: { i18n },
          language,
        } = ctx
        return get(i18n, [language, key]) ?? key
      }
      ctx.addExpressionEvaluator(i18nExpressionEvaluator)
    },
  }
