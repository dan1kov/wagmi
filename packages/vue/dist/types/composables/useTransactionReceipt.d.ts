import type { Config, GetTransactionReceiptErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetTransactionReceiptData, type GetTransactionReceiptOptions, type GetTransactionReceiptQueryKey } from '@wagmi/core/query';
import type { GetTransactionReceiptQueryFnData } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import type { DeepMaybeRef } from '../types/ref.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseTransactionReceiptParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetTransactionReceiptData<config, chainId>> = Compute<DeepMaybeRef<GetTransactionReceiptOptions<config, chainId> & ConfigParameter<config> & QueryParameter<GetTransactionReceiptQueryFnData<config, chainId>, GetTransactionReceiptErrorType, selectData, GetTransactionReceiptQueryKey<config, chainId>>>>;
export type UseTransactionReceiptReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetTransactionReceiptData<config, chainId>> = UseQueryReturnType<selectData, GetTransactionReceiptErrorType>;
/** https://wagmi.sh/vue/api/composables/useTransactionReceipt */
export declare function useTransactionReceipt<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetTransactionReceiptData<config, chainId>>(parameters_?: UseTransactionReceiptParameters<config, chainId, selectData>): UseTransactionReceiptReturnType<config, chainId, selectData>;
//# sourceMappingURL=useTransactionReceipt.d.ts.map