import { getConnectors, watchConnectors, } from '@wagmi/core';
import { onScopeDispose, ref } from 'vue-demi';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useConnectors */
export function useConnectors(parameters = {}) {
    const config = useConfig(parameters);
    const connectors = ref(getConnectors(config));
    const unsubscribe = watchConnectors(config, {
        onChange(data) {
            connectors.value = data;
        },
    });
    onScopeDispose(() => unsubscribe());
    return connectors;
}
//# sourceMappingURL=useConnectors.js.map