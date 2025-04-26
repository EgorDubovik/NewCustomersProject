
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PersonalAccessToken
 * 
 */
export type PersonalAccessToken = $Result.DefaultSelection<Prisma.$PersonalAccessTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PersonalAccessTokens
 * const personalAccessTokens = await prisma.personalAccessToken.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PersonalAccessTokens
   * const personalAccessTokens = await prisma.personalAccessToken.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.personalAccessToken`: Exposes CRUD operations for the **PersonalAccessToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PersonalAccessTokens
    * const personalAccessTokens = await prisma.personalAccessToken.findMany()
    * ```
    */
  get personalAccessToken(): Prisma.PersonalAccessTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PersonalAccessToken: 'PersonalAccessToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "personalAccessToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PersonalAccessToken: {
        payload: Prisma.$PersonalAccessTokenPayload<ExtArgs>
        fields: Prisma.PersonalAccessTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonalAccessTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonalAccessTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>
          }
          findFirst: {
            args: Prisma.PersonalAccessTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonalAccessTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>
          }
          findMany: {
            args: Prisma.PersonalAccessTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>[]
          }
          create: {
            args: Prisma.PersonalAccessTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>
          }
          createMany: {
            args: Prisma.PersonalAccessTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonalAccessTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>[]
          }
          delete: {
            args: Prisma.PersonalAccessTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>
          }
          update: {
            args: Prisma.PersonalAccessTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>
          }
          deleteMany: {
            args: Prisma.PersonalAccessTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonalAccessTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonalAccessTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>[]
          }
          upsert: {
            args: Prisma.PersonalAccessTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokenPayload>
          }
          aggregate: {
            args: Prisma.PersonalAccessTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonalAccessToken>
          }
          groupBy: {
            args: Prisma.PersonalAccessTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonalAccessTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonalAccessTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PersonalAccessTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    personalAccessToken?: PersonalAccessTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model PersonalAccessToken
   */

  export type AggregatePersonalAccessToken = {
    _count: PersonalAccessTokenCountAggregateOutputType | null
    _avg: PersonalAccessTokenAvgAggregateOutputType | null
    _sum: PersonalAccessTokenSumAggregateOutputType | null
    _min: PersonalAccessTokenMinAggregateOutputType | null
    _max: PersonalAccessTokenMaxAggregateOutputType | null
  }

  export type PersonalAccessTokenAvgAggregateOutputType = {
    id: number | null
    tokenable_id: number | null
  }

  export type PersonalAccessTokenSumAggregateOutputType = {
    id: number | null
    tokenable_id: number | null
  }

  export type PersonalAccessTokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    tokenable_id: number | null
    tokenable_type: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PersonalAccessTokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    tokenable_id: number | null
    tokenable_type: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PersonalAccessTokenCountAggregateOutputType = {
    id: number
    token: number
    tokenable_id: number
    tokenable_type: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PersonalAccessTokenAvgAggregateInputType = {
    id?: true
    tokenable_id?: true
  }

  export type PersonalAccessTokenSumAggregateInputType = {
    id?: true
    tokenable_id?: true
  }

  export type PersonalAccessTokenMinAggregateInputType = {
    id?: true
    token?: true
    tokenable_id?: true
    tokenable_type?: true
    created_at?: true
    updated_at?: true
  }

  export type PersonalAccessTokenMaxAggregateInputType = {
    id?: true
    token?: true
    tokenable_id?: true
    tokenable_type?: true
    created_at?: true
    updated_at?: true
  }

  export type PersonalAccessTokenCountAggregateInputType = {
    id?: true
    token?: true
    tokenable_id?: true
    tokenable_type?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PersonalAccessTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalAccessToken to aggregate.
     */
    where?: PersonalAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokenOrderByWithRelationInput | PersonalAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonalAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PersonalAccessTokens
    **/
    _count?: true | PersonalAccessTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonalAccessTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonalAccessTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonalAccessTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonalAccessTokenMaxAggregateInputType
  }

  export type GetPersonalAccessTokenAggregateType<T extends PersonalAccessTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonalAccessToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonalAccessToken[P]>
      : GetScalarType<T[P], AggregatePersonalAccessToken[P]>
  }




  export type PersonalAccessTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalAccessTokenWhereInput
    orderBy?: PersonalAccessTokenOrderByWithAggregationInput | PersonalAccessTokenOrderByWithAggregationInput[]
    by: PersonalAccessTokenScalarFieldEnum[] | PersonalAccessTokenScalarFieldEnum
    having?: PersonalAccessTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonalAccessTokenCountAggregateInputType | true
    _avg?: PersonalAccessTokenAvgAggregateInputType
    _sum?: PersonalAccessTokenSumAggregateInputType
    _min?: PersonalAccessTokenMinAggregateInputType
    _max?: PersonalAccessTokenMaxAggregateInputType
  }

  export type PersonalAccessTokenGroupByOutputType = {
    id: number
    token: string
    tokenable_id: number
    tokenable_type: string
    created_at: Date
    updated_at: Date
    _count: PersonalAccessTokenCountAggregateOutputType | null
    _avg: PersonalAccessTokenAvgAggregateOutputType | null
    _sum: PersonalAccessTokenSumAggregateOutputType | null
    _min: PersonalAccessTokenMinAggregateOutputType | null
    _max: PersonalAccessTokenMaxAggregateOutputType | null
  }

  type GetPersonalAccessTokenGroupByPayload<T extends PersonalAccessTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonalAccessTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonalAccessTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonalAccessTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PersonalAccessTokenGroupByOutputType[P]>
        }
      >
    >


  export type PersonalAccessTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    tokenable_id?: boolean
    tokenable_type?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["personalAccessToken"]>

  export type PersonalAccessTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    tokenable_id?: boolean
    tokenable_type?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["personalAccessToken"]>

  export type PersonalAccessTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    tokenable_id?: boolean
    tokenable_type?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["personalAccessToken"]>

  export type PersonalAccessTokenSelectScalar = {
    id?: boolean
    token?: boolean
    tokenable_id?: boolean
    tokenable_type?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PersonalAccessTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "tokenable_id" | "tokenable_type" | "created_at" | "updated_at", ExtArgs["result"]["personalAccessToken"]>

  export type $PersonalAccessTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PersonalAccessToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      token: string
      tokenable_id: number
      tokenable_type: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["personalAccessToken"]>
    composites: {}
  }

  type PersonalAccessTokenGetPayload<S extends boolean | null | undefined | PersonalAccessTokenDefaultArgs> = $Result.GetResult<Prisma.$PersonalAccessTokenPayload, S>

  type PersonalAccessTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonalAccessTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonalAccessTokenCountAggregateInputType | true
    }

  export interface PersonalAccessTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PersonalAccessToken'], meta: { name: 'PersonalAccessToken' } }
    /**
     * Find zero or one PersonalAccessToken that matches the filter.
     * @param {PersonalAccessTokenFindUniqueArgs} args - Arguments to find a PersonalAccessToken
     * @example
     * // Get one PersonalAccessToken
     * const personalAccessToken = await prisma.personalAccessToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonalAccessTokenFindUniqueArgs>(args: SelectSubset<T, PersonalAccessTokenFindUniqueArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PersonalAccessToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonalAccessTokenFindUniqueOrThrowArgs} args - Arguments to find a PersonalAccessToken
     * @example
     * // Get one PersonalAccessToken
     * const personalAccessToken = await prisma.personalAccessToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonalAccessTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonalAccessTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalAccessToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokenFindFirstArgs} args - Arguments to find a PersonalAccessToken
     * @example
     * // Get one PersonalAccessToken
     * const personalAccessToken = await prisma.personalAccessToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonalAccessTokenFindFirstArgs>(args?: SelectSubset<T, PersonalAccessTokenFindFirstArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalAccessToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokenFindFirstOrThrowArgs} args - Arguments to find a PersonalAccessToken
     * @example
     * // Get one PersonalAccessToken
     * const personalAccessToken = await prisma.personalAccessToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonalAccessTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonalAccessTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PersonalAccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessToken.findMany()
     * 
     * // Get first 10 PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personalAccessTokenWithIdOnly = await prisma.personalAccessToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonalAccessTokenFindManyArgs>(args?: SelectSubset<T, PersonalAccessTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PersonalAccessToken.
     * @param {PersonalAccessTokenCreateArgs} args - Arguments to create a PersonalAccessToken.
     * @example
     * // Create one PersonalAccessToken
     * const PersonalAccessToken = await prisma.personalAccessToken.create({
     *   data: {
     *     // ... data to create a PersonalAccessToken
     *   }
     * })
     * 
     */
    create<T extends PersonalAccessTokenCreateArgs>(args: SelectSubset<T, PersonalAccessTokenCreateArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PersonalAccessTokens.
     * @param {PersonalAccessTokenCreateManyArgs} args - Arguments to create many PersonalAccessTokens.
     * @example
     * // Create many PersonalAccessTokens
     * const personalAccessToken = await prisma.personalAccessToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonalAccessTokenCreateManyArgs>(args?: SelectSubset<T, PersonalAccessTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PersonalAccessTokens and returns the data saved in the database.
     * @param {PersonalAccessTokenCreateManyAndReturnArgs} args - Arguments to create many PersonalAccessTokens.
     * @example
     * // Create many PersonalAccessTokens
     * const personalAccessToken = await prisma.personalAccessToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PersonalAccessTokens and only return the `id`
     * const personalAccessTokenWithIdOnly = await prisma.personalAccessToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonalAccessTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonalAccessTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PersonalAccessToken.
     * @param {PersonalAccessTokenDeleteArgs} args - Arguments to delete one PersonalAccessToken.
     * @example
     * // Delete one PersonalAccessToken
     * const PersonalAccessToken = await prisma.personalAccessToken.delete({
     *   where: {
     *     // ... filter to delete one PersonalAccessToken
     *   }
     * })
     * 
     */
    delete<T extends PersonalAccessTokenDeleteArgs>(args: SelectSubset<T, PersonalAccessTokenDeleteArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PersonalAccessToken.
     * @param {PersonalAccessTokenUpdateArgs} args - Arguments to update one PersonalAccessToken.
     * @example
     * // Update one PersonalAccessToken
     * const personalAccessToken = await prisma.personalAccessToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonalAccessTokenUpdateArgs>(args: SelectSubset<T, PersonalAccessTokenUpdateArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PersonalAccessTokens.
     * @param {PersonalAccessTokenDeleteManyArgs} args - Arguments to filter PersonalAccessTokens to delete.
     * @example
     * // Delete a few PersonalAccessTokens
     * const { count } = await prisma.personalAccessToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonalAccessTokenDeleteManyArgs>(args?: SelectSubset<T, PersonalAccessTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonalAccessTokens
     * const personalAccessToken = await prisma.personalAccessToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonalAccessTokenUpdateManyArgs>(args: SelectSubset<T, PersonalAccessTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalAccessTokens and returns the data updated in the database.
     * @param {PersonalAccessTokenUpdateManyAndReturnArgs} args - Arguments to update many PersonalAccessTokens.
     * @example
     * // Update many PersonalAccessTokens
     * const personalAccessToken = await prisma.personalAccessToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PersonalAccessTokens and only return the `id`
     * const personalAccessTokenWithIdOnly = await prisma.personalAccessToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonalAccessTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonalAccessTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PersonalAccessToken.
     * @param {PersonalAccessTokenUpsertArgs} args - Arguments to update or create a PersonalAccessToken.
     * @example
     * // Update or create a PersonalAccessToken
     * const personalAccessToken = await prisma.personalAccessToken.upsert({
     *   create: {
     *     // ... data to create a PersonalAccessToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonalAccessToken we want to update
     *   }
     * })
     */
    upsert<T extends PersonalAccessTokenUpsertArgs>(args: SelectSubset<T, PersonalAccessTokenUpsertArgs<ExtArgs>>): Prisma__PersonalAccessTokenClient<$Result.GetResult<Prisma.$PersonalAccessTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PersonalAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokenCountArgs} args - Arguments to filter PersonalAccessTokens to count.
     * @example
     * // Count the number of PersonalAccessTokens
     * const count = await prisma.personalAccessToken.count({
     *   where: {
     *     // ... the filter for the PersonalAccessTokens we want to count
     *   }
     * })
    **/
    count<T extends PersonalAccessTokenCountArgs>(
      args?: Subset<T, PersonalAccessTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonalAccessTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PersonalAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonalAccessTokenAggregateArgs>(args: Subset<T, PersonalAccessTokenAggregateArgs>): Prisma.PrismaPromise<GetPersonalAccessTokenAggregateType<T>>

    /**
     * Group by PersonalAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonalAccessTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonalAccessTokenGroupByArgs['orderBy'] }
        : { orderBy?: PersonalAccessTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonalAccessTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonalAccessTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PersonalAccessToken model
   */
  readonly fields: PersonalAccessTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PersonalAccessToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonalAccessTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PersonalAccessToken model
   */
  interface PersonalAccessTokenFieldRefs {
    readonly id: FieldRef<"PersonalAccessToken", 'Int'>
    readonly token: FieldRef<"PersonalAccessToken", 'String'>
    readonly tokenable_id: FieldRef<"PersonalAccessToken", 'Int'>
    readonly tokenable_type: FieldRef<"PersonalAccessToken", 'String'>
    readonly created_at: FieldRef<"PersonalAccessToken", 'DateTime'>
    readonly updated_at: FieldRef<"PersonalAccessToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PersonalAccessToken findUnique
   */
  export type PersonalAccessTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which PersonalAccessToken to fetch.
     */
    where: PersonalAccessTokenWhereUniqueInput
  }

  /**
   * PersonalAccessToken findUniqueOrThrow
   */
  export type PersonalAccessTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which PersonalAccessToken to fetch.
     */
    where: PersonalAccessTokenWhereUniqueInput
  }

  /**
   * PersonalAccessToken findFirst
   */
  export type PersonalAccessTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which PersonalAccessToken to fetch.
     */
    where?: PersonalAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokenOrderByWithRelationInput | PersonalAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalAccessTokens.
     */
    cursor?: PersonalAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalAccessTokens.
     */
    distinct?: PersonalAccessTokenScalarFieldEnum | PersonalAccessTokenScalarFieldEnum[]
  }

  /**
   * PersonalAccessToken findFirstOrThrow
   */
  export type PersonalAccessTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which PersonalAccessToken to fetch.
     */
    where?: PersonalAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokenOrderByWithRelationInput | PersonalAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalAccessTokens.
     */
    cursor?: PersonalAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalAccessTokens.
     */
    distinct?: PersonalAccessTokenScalarFieldEnum | PersonalAccessTokenScalarFieldEnum[]
  }

  /**
   * PersonalAccessToken findMany
   */
  export type PersonalAccessTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which PersonalAccessTokens to fetch.
     */
    where?: PersonalAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokenOrderByWithRelationInput | PersonalAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PersonalAccessTokens.
     */
    cursor?: PersonalAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    distinct?: PersonalAccessTokenScalarFieldEnum | PersonalAccessTokenScalarFieldEnum[]
  }

  /**
   * PersonalAccessToken create
   */
  export type PersonalAccessTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a PersonalAccessToken.
     */
    data: XOR<PersonalAccessTokenCreateInput, PersonalAccessTokenUncheckedCreateInput>
  }

  /**
   * PersonalAccessToken createMany
   */
  export type PersonalAccessTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonalAccessTokens.
     */
    data: PersonalAccessTokenCreateManyInput | PersonalAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalAccessToken createManyAndReturn
   */
  export type PersonalAccessTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PersonalAccessTokens.
     */
    data: PersonalAccessTokenCreateManyInput | PersonalAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalAccessToken update
   */
  export type PersonalAccessTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a PersonalAccessToken.
     */
    data: XOR<PersonalAccessTokenUpdateInput, PersonalAccessTokenUncheckedUpdateInput>
    /**
     * Choose, which PersonalAccessToken to update.
     */
    where: PersonalAccessTokenWhereUniqueInput
  }

  /**
   * PersonalAccessToken updateMany
   */
  export type PersonalAccessTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonalAccessTokens.
     */
    data: XOR<PersonalAccessTokenUpdateManyMutationInput, PersonalAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which PersonalAccessTokens to update
     */
    where?: PersonalAccessTokenWhereInput
    /**
     * Limit how many PersonalAccessTokens to update.
     */
    limit?: number
  }

  /**
   * PersonalAccessToken updateManyAndReturn
   */
  export type PersonalAccessTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to update PersonalAccessTokens.
     */
    data: XOR<PersonalAccessTokenUpdateManyMutationInput, PersonalAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which PersonalAccessTokens to update
     */
    where?: PersonalAccessTokenWhereInput
    /**
     * Limit how many PersonalAccessTokens to update.
     */
    limit?: number
  }

  /**
   * PersonalAccessToken upsert
   */
  export type PersonalAccessTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the PersonalAccessToken to update in case it exists.
     */
    where: PersonalAccessTokenWhereUniqueInput
    /**
     * In case the PersonalAccessToken found by the `where` argument doesn't exist, create a new PersonalAccessToken with this data.
     */
    create: XOR<PersonalAccessTokenCreateInput, PersonalAccessTokenUncheckedCreateInput>
    /**
     * In case the PersonalAccessToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonalAccessTokenUpdateInput, PersonalAccessTokenUncheckedUpdateInput>
  }

  /**
   * PersonalAccessToken delete
   */
  export type PersonalAccessTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
    /**
     * Filter which PersonalAccessToken to delete.
     */
    where: PersonalAccessTokenWhereUniqueInput
  }

  /**
   * PersonalAccessToken deleteMany
   */
  export type PersonalAccessTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalAccessTokens to delete
     */
    where?: PersonalAccessTokenWhereInput
    /**
     * Limit how many PersonalAccessTokens to delete.
     */
    limit?: number
  }

  /**
   * PersonalAccessToken without action
   */
  export type PersonalAccessTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessToken
     */
    select?: PersonalAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessToken
     */
    omit?: PersonalAccessTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PersonalAccessTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    tokenable_id: 'tokenable_id',
    tokenable_type: 'tokenable_type',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PersonalAccessTokenScalarFieldEnum = (typeof PersonalAccessTokenScalarFieldEnum)[keyof typeof PersonalAccessTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PersonalAccessTokenWhereInput = {
    AND?: PersonalAccessTokenWhereInput | PersonalAccessTokenWhereInput[]
    OR?: PersonalAccessTokenWhereInput[]
    NOT?: PersonalAccessTokenWhereInput | PersonalAccessTokenWhereInput[]
    id?: IntFilter<"PersonalAccessToken"> | number
    token?: StringFilter<"PersonalAccessToken"> | string
    tokenable_id?: IntFilter<"PersonalAccessToken"> | number
    tokenable_type?: StringFilter<"PersonalAccessToken"> | string
    created_at?: DateTimeFilter<"PersonalAccessToken"> | Date | string
    updated_at?: DateTimeFilter<"PersonalAccessToken"> | Date | string
  }

  export type PersonalAccessTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    tokenable_id?: SortOrder
    tokenable_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PersonalAccessTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PersonalAccessTokenWhereInput | PersonalAccessTokenWhereInput[]
    OR?: PersonalAccessTokenWhereInput[]
    NOT?: PersonalAccessTokenWhereInput | PersonalAccessTokenWhereInput[]
    token?: StringFilter<"PersonalAccessToken"> | string
    tokenable_id?: IntFilter<"PersonalAccessToken"> | number
    tokenable_type?: StringFilter<"PersonalAccessToken"> | string
    created_at?: DateTimeFilter<"PersonalAccessToken"> | Date | string
    updated_at?: DateTimeFilter<"PersonalAccessToken"> | Date | string
  }, "id">

  export type PersonalAccessTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    tokenable_id?: SortOrder
    tokenable_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PersonalAccessTokenCountOrderByAggregateInput
    _avg?: PersonalAccessTokenAvgOrderByAggregateInput
    _max?: PersonalAccessTokenMaxOrderByAggregateInput
    _min?: PersonalAccessTokenMinOrderByAggregateInput
    _sum?: PersonalAccessTokenSumOrderByAggregateInput
  }

  export type PersonalAccessTokenScalarWhereWithAggregatesInput = {
    AND?: PersonalAccessTokenScalarWhereWithAggregatesInput | PersonalAccessTokenScalarWhereWithAggregatesInput[]
    OR?: PersonalAccessTokenScalarWhereWithAggregatesInput[]
    NOT?: PersonalAccessTokenScalarWhereWithAggregatesInput | PersonalAccessTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PersonalAccessToken"> | number
    token?: StringWithAggregatesFilter<"PersonalAccessToken"> | string
    tokenable_id?: IntWithAggregatesFilter<"PersonalAccessToken"> | number
    tokenable_type?: StringWithAggregatesFilter<"PersonalAccessToken"> | string
    created_at?: DateTimeWithAggregatesFilter<"PersonalAccessToken"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PersonalAccessToken"> | Date | string
  }

  export type PersonalAccessTokenCreateInput = {
    token: string
    tokenable_id: number
    tokenable_type: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PersonalAccessTokenUncheckedCreateInput = {
    id?: number
    token: string
    tokenable_id: number
    tokenable_type: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PersonalAccessTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    tokenable_id?: IntFieldUpdateOperationsInput | number
    tokenable_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    tokenable_id?: IntFieldUpdateOperationsInput | number
    tokenable_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokenCreateManyInput = {
    id?: number
    token: string
    tokenable_id: number
    tokenable_type: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PersonalAccessTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    tokenable_id?: IntFieldUpdateOperationsInput | number
    tokenable_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    tokenable_id?: IntFieldUpdateOperationsInput | number
    tokenable_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PersonalAccessTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    tokenable_id?: SortOrder
    tokenable_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PersonalAccessTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    tokenable_id?: SortOrder
  }

  export type PersonalAccessTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    tokenable_id?: SortOrder
    tokenable_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PersonalAccessTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    tokenable_id?: SortOrder
    tokenable_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PersonalAccessTokenSumOrderByAggregateInput = {
    id?: SortOrder
    tokenable_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}