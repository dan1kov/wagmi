import { type Config, type GetAccountReturnType, type ResolvedRegister } from '@wagmi/core';
import { type ToRefs } from 'vue-demi';
import type { ConfigParameter } from '../types/properties.js';
export type UseAccountParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseAccountReturnType<config extends Config = Config> = ToRefs<GetAccountReturnType<config>>;
/** https://wagmi.sh/vue/api/composables/useAccount */
export declare function useAccount<config extends Config = ResolvedRegister['config']>(parameters?: UseAccountParameters<config>): UseAccountReturnType<config>;
//# sourceMappingURL=useAccount.d.ts.map