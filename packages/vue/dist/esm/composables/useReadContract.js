import { readContractQueryOptions, structuralSharing, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/hooks/useReadContract */
export function useReadContract(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { abi, address, chainId = configChainId.value, code, functionName, query = {}, } = parameters.value;
        const options = readContractQueryOptions(config, { ...parameters.value, chainId });
        const enabled = Boolean((address || code) && abi && functionName && (query.enabled ?? true));
        return {
            ...query,
            ...options,
            enabled,
            structuralSharing: query.structuralSharing ?? structuralSharing,
        };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useReadContract.js.map