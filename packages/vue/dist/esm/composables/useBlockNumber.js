import { useQueryClient } from '@tanstack/vue-query';
import { getBlockNumberQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
import { useWatchBlockNumber, } from './useWatchBlockNumber.js';
/** https://wagmi.sh/vue/api/composables/useBlockNumber */
export function useBlockNumber(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const queryClient = useQueryClient();
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { chainId = configChainId.value, query = {}, watch: _, ...rest } = parameters.value;
        const options = getBlockNumberQueryOptions(config, {
            ...deepUnref(rest),
            chainId,
        });
        return {
            ...query,
            ...options,
        };
    });
    const watchBlockNumberArgs = computed(() => {
        const { config, chainId = configChainId.value, query, watch, } = parameters.value;
        return {
            ...{
                config,
                chainId,
                ...(typeof watch === 'object' ? watch : {}),
            },
            enabled: (query?.enabled ?? true) &&
                (typeof watch === 'object' ? watch.enabled : watch),
            onBlockNumber(blockNumber) {
                queryClient.setQueryData(queryOptions.value.queryKey, blockNumber);
            },
        };
    });
    useWatchBlockNumber(watchBlockNumberArgs);
    return useQuery(queryOptions);
}
//# sourceMappingURL=useBlockNumber.js.map