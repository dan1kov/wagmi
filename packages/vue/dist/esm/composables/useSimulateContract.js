import { simulateContractQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
import { useConnectorClient } from './useConnectorClient.js';
/** https://wagmi.sh/vue/api/composables/useSimulateContract */
export function useSimulateContract(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const { data: connectorClient } = useConnectorClient(computed(() => ({
        connector: parameters.value.connector,
        query: { enabled: parameters.value.account === undefined },
    })));
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { abi, account = connectorClient?.value?.account, address, chainId = configChainId.value, functionName, query = {}, } = parameters.value;
        const options = simulateContractQueryOptions(config, {
            ...parameters.value,
            account,
            chainId,
        });
        const enabled = Boolean(abi && address && functionName && (query.enabled ?? true));
        return {
            ...query,
            ...options,
            enabled,
        };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useSimulateContract.js.map