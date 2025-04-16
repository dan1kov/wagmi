import { getChainId, watchChainId, } from '@wagmi/core';
import { onScopeDispose, readonly, ref } from 'vue-demi';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useChainId */
export function useChainId(parameters = {}) {
    const config = useConfig(parameters);
    const chainId = ref(getChainId(config));
    const unsubscribe = watchChainId(config, {
        onChange(data) {
            chainId.value = data;
        },
    });
    onScopeDispose(() => unsubscribe());
    return readonly(chainId);
}
//# sourceMappingURL=useChainId.js.map