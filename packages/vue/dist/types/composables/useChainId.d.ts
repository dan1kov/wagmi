import { type Config, type GetChainIdReturnType, type ResolvedRegister } from '@wagmi/core';
import { type Ref } from 'vue-demi';
import type { ConfigParameter } from '../types/properties.js';
export type UseChainIdParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseChainIdReturnType<config extends Config = Config> = Ref<GetChainIdReturnType<config>>;
/** https://wagmi.sh/vue/api/composables/useChainId */
export declare function useChainId<config extends Config = ResolvedRegister['config']>(parameters?: UseChainIdParameters<config>): UseChainIdReturnType<config>;
//# sourceMappingURL=useChainId.d.ts.map