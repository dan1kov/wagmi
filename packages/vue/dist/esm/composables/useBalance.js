import { getBalanceQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useBalance */
export function useBalance(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { address, chainId = configChainId.value, query = {}, } = parameters.value;
        const options = getBalanceQueryOptions(config, {
            ...parameters.value,
            chainId,
        });
        const enabled = Boolean(address && (query.enabled ?? true));
        return { ...query, ...options, enabled };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useBalance.js.map