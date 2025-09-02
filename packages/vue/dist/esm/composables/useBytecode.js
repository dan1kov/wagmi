import { getBytecodeQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/hooks/useBytecode */
export function useBytecode(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { address: contractAddress, chainId: parametersChainId, query = {}, } = parameters.value;
        const options = getBytecodeQueryOptions(config, {
            ...parameters.value,
            address: contractAddress,
            chainId: parametersChainId ?? chainId.value,
        });
        const enabled = Boolean(contractAddress && (query.enabled ?? true));
        return { ...query, ...options, enabled };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useBytecode.js.map