import { useQueryClient } from '@tanstack/vue-query';
import { getConnectorClientQueryOptions, } from '@wagmi/core/query';
import { computed, ref, watchEffect } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery, } from '../utils/query.js';
import { useAccount } from './useAccount.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useConnectorClient */
export function useConnectorClient(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const queryClient = useQueryClient();
    const { address, connector: accountConnector, status, } = useAccount({ config });
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { chainId = configChainId.value, connector = accountConnector.value, query = {}, } = parameters.value;
        const { queryKey, ...options } = getConnectorClientQueryOptions(config, {
            ...deepUnref(parameters),
            chainId: chainId,
            connector: connector,
        });
        const enabled = Boolean((status.value === 'connected' ||
            (status.value === 'reconnecting' && connector?.getProvider)) &&
            (query.enabled ?? true));
        return {
            ...query,
            ...options,
            queryKey,
            enabled,
            staleTime: Number.POSITIVE_INFINITY,
        };
    });
    const addressRef = ref(address);
    watchEffect(() => {
        const previousAddress = addressRef.value;
        if (!address && previousAddress) {
            // remove when account is disconnected
            queryClient.removeQueries({ queryKey: queryOptions.value.queryKey });
            addressRef.value = undefined;
        }
        else if (address.value !== previousAddress) {
            // invalidate when address changes
            queryClient.invalidateQueries({ queryKey: queryOptions.value.queryKey });
            addressRef.value = address.value;
        }
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useConnectorClient.js.map