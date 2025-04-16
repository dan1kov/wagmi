import { getChains, } from '@wagmi/core';
import { watchChains } from '@wagmi/core/internal';
import { onScopeDispose, readonly, ref } from 'vue-demi';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useChains */
export function useChains(parameters = {}) {
    const config = useConfig(parameters);
    const chains = ref(getChains(config));
    const unsubscribe = watchChains(config, {
        onChange(data) {
            chains.value = data;
        },
    });
    onScopeDispose(() => unsubscribe());
    return readonly(chains);
}
//# sourceMappingURL=useChains.js.map