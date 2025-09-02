import { type Config, type GetConnectorsReturnType, type ResolvedRegister } from '@wagmi/core';
import { type Ref } from 'vue-demi';
import type { ConfigParameter } from '../types/properties.js';
export type UseConnectorsParameters<config extends Config = Config> = ConfigParameter<config>;
export type UseConnectorsReturnType<config extends Config = Config> = Ref<GetConnectorsReturnType<config>>;
/** https://wagmi.sh/vue/api/composables/useConnectors */
export declare function useConnectors<config extends Config = ResolvedRegister['config']>(parameters?: UseConnectorsParameters<config>): UseConnectorsReturnType<config>;
//# sourceMappingURL=useConnectors.d.ts.map