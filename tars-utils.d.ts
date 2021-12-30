// Type defined by feihua

export interface ConfigureParseFileRet {
  code: 0 | -1,
  message: string,
  exception?: any
}

export type ConfigureParseFileCallback = (ret: ConfigureParseFileRet, config: Configure) => any

export class Configure {
  /** 文件解析的结果 */
  readonly data: any

  /** 文件解析的结果 */
  readonly json: any

  /**
   * 解析字符串, 并将解析的结果存于内部的 `_data` 属性中，可以通过 `get` 方法获取相应的值
   * @param sText 字符串
   * @returns 解析是否成功
   */
  parseText (sText: string): boolean

  /**
   * 解析指定文件
   * @param sFilePath 文件名
   * @param callback 回调函数
   */
  parseFile (sFilePath: string, callback?: ConfigureParseFileCallback): void

  /**
   * 解析指定文件
   * @param sFilePath 文件名
   * @param encoding 文件编码类型 (默认值: utf8)
   * @param callback 回调函数
   */
  parseFile (sFilePath: string, encoding: string, callback?: ConfigureParseFileCallback): void

  /**
   * 文件被解析之后, 会将结果存储到一个对象中, 通过 `get` 方法可以获取制定的值.
   * 注: 如果配置文件/字符串中有相同的 key, 则 `get` 获取 key 对应的值时, 不会获取所有的值,
   * 而是获取该 key 最后对应的那个值, 也可以理解为对应相同的 key 后面的值覆盖前面的值
   * @param key 需要取值的 key 值, 格式为 `x1.x2.x3`, 其中 `x1`, `x2`, `x3` 依次为深层次的 key. 注: 如果 key 值本身为 `x1.x2` 格式，取该 key 对应的值时需要写成 `<x1.x2>`. 具体使用参见例子
   * @param defaultValue 取不到结果的默认值
   * @param notClone 是否取消对象深拷贝
   */
  get<T = any> (key: string, defaultValue?: string, notClone?: boolean): T

  /**
   * 获取 key 对应的值中类型为 Object 的属性数组
   * @param key key 值
   * @param defaultValue 取不到结果的默认值
   */
  getDomain (key: string, defaultValue?: string[]): string[]

  /**
   * 获取 key 对应路径下的所有非空行
   * @param key key 值
   * @param defaultValue 取不到结果的默认值
   */
  getDomainLine (key: string, defaultValue?: any[]): any[]

  /**
   * 获取 key 对应的值中类型为 Object 的属性值数组
   * @param key key 值
   * @param defaultValue 取不到结果的默认值
   */
  getDomainValue (key: string, defaultValue?: any[]): any[]
}

export type Config = Configure
export const Config: typeof Configure

export class Endpoint {
  sProtocol: string
  sHost: string
  iPort: number
  iTimeout: number

  /** 拷贝 `Endpoint` 实例 */
  copy (): Endpoint

  /** `Endpoint` 信息转化成字符串 */
  toString(): string

  /**
   * 从字符串中解析出 `Endpoint` 信息
   * @param desc 字符串, 例如: `tcp -h 10.136.167.31 -p 19386 -t 60000`
   */
  static parse (desc: string): Endpoint
}

export interface Timestamp {
  hrtime: [number, number],
  timestamp: number
}

export namespace timeProvider {
  /** 采用 `Date.now()` 的方式获取时间, 此种方式效率最高 */
  export function nowTimestamp (): number

  /**
   * 当前时间相对于 `oTime` 的时间间隔, 与 `nowTimestamp` 配对使用
   * @param oTime 相对时间, 由 `nowTimestamp` 函数返回
   * @returns 浮点类型, 时间间隔, 单位毫秒
   */
  export function diff (oTime: number): number

  /** 获取当前的时间戳, 即机器从启动到当前的时间 `process.hrtime` */
  export function dateTimestamp (): Timestamp

  /**
   * 当前时间相对于 `oTime` 的时间间隔, 与 `dateTimestamp` 配对使用
   * @param oTime 相对时间, 由 `dateTimestamp` 函数返回
   * @returns 浮点类型, 时间间隔, 单位毫秒
   */
  export function dateTimestampDiff (oTime: Timestamp): number
}

export namespace uuidGenerator {
  /** 根据ip、pid、时间戳、seq 生成的随机不重复uuid */
  export function genID (): string

  /** 重新初始化uuid生成器，指定ip */
  export function init(sIp: string): void
}

interface TarsPromiseConstructor extends PromiseConstructor {
  defer<T> (): {
    promise: Promise<T>,
    resolve (value: T): void,
    reject (reason: any): void
  }
}

export const Promise: TarsPromiseConstructor