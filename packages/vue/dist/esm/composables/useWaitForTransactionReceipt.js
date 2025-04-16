import { waitForTransactionReceiptQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters_);
    const configChainId = useChainId();
    const queryOptions = computed(() => {
        const { chainId = configChainId.value, hash, query = {} } = parameters.value;
        const options = waitForTransactionReceiptQueryOptions(config, {
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
//# sourceMappingURL=useWaitForTransactionReceipt.js.map