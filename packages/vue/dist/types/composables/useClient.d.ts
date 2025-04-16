import { type Config, type GetClientParameters, type GetClientReturnType, type ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type Ref } from 'vue-demi';
import type { ConfigParameter } from '../types/properties.js';
import type { DeepMaybeRef } from '../types/ref.js';
export type UseClientParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined> = Compute<DeepMaybeRef<GetClientParameters<config, chainId> & ConfigParameter<config>>>;
export type UseClientReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined> = Ref<GetClientReturnType<config, chainId>>;
/** https://wagmi.sh/vue/api/composables/useClient */
export declare function useClient<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | number | undefined = config['chains'][number]['id'] | undefined>(parameters?: UseClientParameters<config, chainId>): UseClientReturnType<config, chainId>;
//# sourceMappingURL=useClient.d.ts.map