import { estimateGasQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
import { useConnectorClient } from './useConnectorClient.js';
export function useEstimateGas(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const { data: connectorClient } = useConnectorClient(computed(() => ({
        connector: parameters.value.connector,
        query: { enabled: parameters.value.account === undefined },
    })));
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { account = connectorClient?.value?.account, chainId = configChainId.value, connector, query = {}, } = parameters.value;
        const options = estimateGasQueryOptions(config, {
            ...parameters.value,
            account,
            chainId,
            connector,
        });
        const enabled = Boolean((account || connector) && (query.enabled ?? true));
        return { ...query, ...options, enabled };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useEstimateGas.js.map