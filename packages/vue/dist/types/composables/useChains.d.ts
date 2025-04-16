import { type Config, type GetChainsReturnType, type ResolvedRegister } from '@wagmi/core';
import { type Ref } from 'vue-demi';
import type { ConfigParameter } from '../types/properties.js';
export type UseChainsParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseChainsReturnType<config extends Config = Config> = Ref<GetChainsReturnType<config>>;
/** https://wagmi.sh/vue/api/composables/useChains */
export declare function useChains<config extends Config = ResolvedRegister['config']>(parameters?: UseChainsParameters<config>): UseChainsReturnType<config>;
//# sourceMappingURL=useChains.d.ts.map