import { getTransactionReceiptQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useTransactionReceipt */
export function useTransactionReceipt(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { chainId = configChainId.value, hash, query = {} } = parameters.value;
        const options = getTransactionReceiptQueryOptions(config, {
            ...parameters.value,
            chainId,
        });
        const enabled = Boolean(hash && (query.enabled ?? true));
        return {
            ...query,
            ...options,
            enabled,
        };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useTransactionReceipt.js.map