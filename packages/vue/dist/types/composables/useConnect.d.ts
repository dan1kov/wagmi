import type { Config, ConnectErrorType, GetConnectorsReturnType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type ConnectData, type ConnectMutate, type ConnectMutateAsync, type ConnectVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseConnectParameters<config extends Config = Config, context = unknown> = Compute<ConfigParameter<config> & {
    mutation?: UseMutationParameters<ConnectData<config>, ConnectErrorType, ConnectVariables<config, config['connectors'][number]>, context> | undefined;
}>;
export type UseConnectReturnType<config extends Config = Config, context = unknown> = Compute<UseMutationReturnType<ConnectData<config>, ConnectErrorType, ConnectVariables<config, config['connectors'][number]>, context> & {
    connect: ConnectMutate<config, context>;
    connectAsync: ConnectMutateAsync<config, context>;
    connectors: Compute<GetConnectorsReturnType> | config['connectors'];
}>;
/** https://wagmi.sh/vue/api/composables/useConnect */
export declare function useConnect<config extends Config = ResolvedRegister['config'], context = unknown>(parameters?: UseConnectParameters<config, context>): UseConnectReturnType<config, context>;
//# sourceMappingURL=useConnect.d.ts.map