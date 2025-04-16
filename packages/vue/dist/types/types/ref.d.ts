import type { Config, Connector } from '@wagmi/core';
import type { MaybeRef, Ref, UnwrapRef } from 'vue-demi';
type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type UnwrapLeaf = Primitive | Function | Date | Error | RegExp | Map<any, any> | WeakMap<any, any> | Set<any> | WeakSet<any>;
export type DeepMaybeRef<value> = MaybeRef<value extends Function | Config | Connector ? value : value extends object | any[] ? {
    [key in keyof value]: DeepMaybeRef<value[key]>;
} : value>;
export type DeepUnwrapRef<T> = T extends UnwrapLeaf ? T : T extends Ref<infer U> ? DeepUnwrapRef<U> : T extends {} ? {
    [Property in keyof T]: DeepUnwrapRef<T[Property]>;
} : UnwrapRef<T>;
export {};
//# sourceMappingURL=ref.d.ts.map