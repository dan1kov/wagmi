import { getEnsAvatarQueryOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useEnsAvatar */
export function useEnsAvatar(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const queryOptions = computed(() => {
        const { chainId = configChainId.value, name, query = {} } = parameters.value;
        const options = getEnsAvatarQueryOptions(config, {
            ...parameters.value,
            chainId,
        });
        const enabled = Boolean(name && (query.enabled ?? true));
        return { ...query, ...options, enabled };
    });
    return useQuery(queryOptions);
}
//# sourceMappingURL=useEnsAvatar.js.map