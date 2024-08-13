import type {
  AnyMoboPlugin,
  InitOptionsByMoboPlugin,
  Mobo,
  MoboDefaultPropertiesExtHkt,
  MoboDefaultPropertiesExtObj,
  MoboPlugin,
  MoboPluginInitFn,
} from '@mobo-ts/mobo'
import type { LiteralObject } from '@p-lc/shared'
import { type editorExtKeys } from './constants'
import { type editorDefaultPlugins } from './plugins'

/**
 * 编辑器扩展键值
 */
export type EditorExtKey = (typeof editorExtKeys)[number]

/**
 * 所有扩展键值
 */
export type AllExtKey = EditorExtKey

/**
 * 编辑器
 */
export type Editor<Plugin extends AnyEditorPlugin> = Mobo<Plugin, EditorExtKey>

/**
 * 编辑器初始化选项
 */
export type EditorInitOptions<Plugin extends AnyEditorPlugin> =
  InitOptionsByMoboPlugin<Plugin, EditorExtKey>

/**
 * 编辑器默认属性扩展，对象形式
 */
export type EditorDefaultPropertiesExtObj =
  MoboDefaultPropertiesExtObj<AllExtKey>

/**
 * 编辑器默认属性扩展，高等类型形式
 */
export type EditorDefaultPropertiesExtHkt = MoboDefaultPropertiesExtHkt

export type { MoboDefaultPropertiesExtHktPlugin as EditorDefaultPropertiesExtHktPlugin } from '@mobo-ts/mobo'

/**
 * 编辑器默认属性扩展
 */
export type EditorDefaultPropertiesExt =
  | EditorDefaultPropertiesExtObj
  | EditorDefaultPropertiesExtHkt

/**
 * 编辑器原始插件
 */
export interface EditorRawPlugin<
  PropertiesExt extends EditorDefaultPropertiesExt = LiteralObject,
  DepPlugin extends AnyEditorPlugin = never,
> extends MoboPlugin<PropertiesExt> {
  /**
   * 初始化编辑器
   */
  initEditor?: MoboPluginInitFn<Editor<this | DepPlugin>>
}

/**
 * 任意编辑器插件
 */
export type AnyEditorPlugin = AnyMoboPlugin

/**
 * 编辑器插件的依赖插件
 */
export type DepPluginOfEditorPlugin<Plugin extends AnyEditorPlugin> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Plugin extends EditorRawPlugin<infer _PropertiesExt, infer DepPlugin>
    ? DepPlugin
    : never

/**
 * 编辑器插件联合依赖插件
 */
export type DepPluginUniteEditorPlugin<Plugin extends AnyEditorPlugin> =
  | Plugin
  | DepPluginOfEditorPlugin<Plugin>

//#region 对外提供的工具类型

/**
 * 编辑器插件
 */
export type EditorPlugin<
  PropertiesExt extends EditorDefaultPropertiesExt = LiteralObject,
  DepPlugin extends AnyEditorPlugin = never,
> = EditorRawPlugin<PropertiesExt, EditorDefaultPlugin | DepPlugin>

/**
 * 编辑器默认插件
 */
export type EditorDefaultPlugin = (typeof editorDefaultPlugins)[number]

/**
 * 默认编辑器
 */
export type DefaultEditor = Editor<EditorDefaultPlugin>

/**
 * 任意编辑器
 */
export type AnyEditor = Editor<AnyEditorPlugin>

export type { PluginOfMoboContext as PluginOfEditor } from '@mobo-ts/mobo'

export type { InitOptionsOfMoboContext as InitOptionsOfEditor } from '@mobo-ts/mobo'

//#endregion
