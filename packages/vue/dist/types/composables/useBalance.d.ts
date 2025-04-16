import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetBalanceData, type GetBalanceOptions, type GetBalanceQueryKey } from '@wagmi/core/query';
import type { GetBalanceQueryFnData } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import type { DeepMaybeRef } from '../types/ref.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseBalanceParameters<config extends Config = Config, selectData = GetBalanceData> = Compute<DeepMaybeRef<GetBalanceOptions<config> & ConfigParameter<config> & QueryParameter<GetBalanceQueryFnData, GetBalanceErrorType, selectData, GetBalanceQueryKey<config>>>>;
export type UseBalanceReturnType<selectData = GetBalanceData> = UseQueryReturnType<selectData, GetBalanceErrorType>;
/** https://wagmi.sh/vue/api/composables/useBalance */
export declare function useBalance<config extends Config = ResolvedRegister['config'], selectData = GetBalanceData>(parameters_?: UseBalanceParameters<config, selectData>): UseBalanceReturnType<selectData>;
//# sourceMappingURL=useBalance.d.ts.map