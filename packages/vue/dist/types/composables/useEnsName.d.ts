import type { Config, GetEnsNameErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetEnsNameData, type GetEnsNameOptions, type GetEnsNameQueryFnData, type GetEnsNameQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import type { DeepMaybeRef } from '../types/ref.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseEnsNameParameters<config extends Config = Config, selectData = GetEnsNameData> = Compute<DeepMaybeRef<GetEnsNameOptions<config> & ConfigParameter<config> & QueryParameter<GetEnsNameQueryFnData, GetEnsNameErrorType, selectData, GetEnsNameQueryKey<config>>>>;
export type UseEnsNameReturnType<selectData = GetEnsNameData> = UseQueryReturnType<selectData, GetEnsNameErrorType>;
/** https://wagmi.sh/vue/api/composables/useEnsName */
export declare function useEnsName<config extends Config = ResolvedRegister['config'], selectData = GetEnsNameData>(parameters_?: UseEnsNameParameters<config, selectData>): UseEnsNameReturnType<selectData>;
//# sourceMappingURL=useEnsName.d.ts.map