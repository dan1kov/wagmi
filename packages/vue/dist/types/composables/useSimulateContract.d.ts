import type { Config, ResolvedRegister, SimulateContractErrorType } from '@wagmi/core';
import { type SimulateContractData, type SimulateContractOptions, type SimulateContractQueryFnData, type SimulateContractQueryKey } from '@wagmi/core/query';
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem';
import { type MaybeRef } from 'vue-demi';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import type { DeepMaybeRef } from '../types/ref.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseSimulateContractParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = SimulateContractData<abi, functionName, args, config, chainId>> = MaybeRef<DeepMaybeRef<SimulateContractOptions<abi, functionName, args, config, chainId>> & ConfigParameter<config> & QueryParameter<SimulateContractQueryFnData<abi, functionName, args, config, chainId>, SimulateContractErrorType, selectData, SimulateContractQueryKey<abi, functionName, args, config, chainId>>>;
export type UseSimulateContractReturnType<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = SimulateContractData<abi, functionName, args, config, chainId>> = UseQueryReturnType<selectData, SimulateContractErrorType>;
/** https://wagmi.sh/vue/api/composables/useSimulateContract */
export declare function useSimulateContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = SimulateContractData<abi, functionName, args, config, chainId>>(parameters_?: UseSimulateContractParameters<abi, functionName, args, config, chainId, selectData>): UseSimulateContractReturnType<abi, functionName, args, config, chainId, selectData>;
//# sourceMappingURL=useSimulateContract.d.ts.map