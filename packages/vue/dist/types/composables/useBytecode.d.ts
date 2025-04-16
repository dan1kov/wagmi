import type { Config, GetBytecodeErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetBytecodeData, type GetBytecodeOptions, type GetBytecodeQueryKey } from '@wagmi/core/query';
import type { GetBytecodeQueryFnData } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
import type { DeepMaybeRef } from '../types/ref.js';
export type UseBytecodeParameters<config extends Config = Config, selectData = GetBytecodeData> = Compute<DeepMaybeRef<GetBytecodeOptions<config> & ConfigParameter<config> & QueryParameter<GetBytecodeQueryFnData, GetBytecodeErrorType, selectData, GetBytecodeQueryKey<config>>>>;
export type UseBytecodeReturnType<selectData = GetBytecodeData> = UseQueryReturnType<selectData, GetBytecodeErrorType>;
/** https://wagmi.sh/vue/api/hooks/useBytecode */
export declare function useBytecode<config extends Config = ResolvedRegister['config'], selectData = GetBytecodeData>(parameters_?: UseBytecodeParameters<config, selectData>): UseBytecodeReturnType<selectData>;
//# sourceMappingURL=useBytecode.d.ts.map