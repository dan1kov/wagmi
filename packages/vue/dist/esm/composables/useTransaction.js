import { getTransactionQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useTransaction */
export function useTransaction(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { blockHash, blockNumber, blockTag, chainId = configChainId.value, hash, query = {}, } = parameters.value;
        const options = getTransactionQueryOptions(config, {
            ...parameters.value,
            chainId,
        });
        const enabled = Boolean(!(blockHash && blockNumber && blockTag && hash) &&
            (query.enabled ?? true));
        return {
            ...query,
            ...options,
            enabled,
        };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useTransaction.js.map