import { getConnections, watchConnections, } from '@wagmi/core';
import { onScopeDispose, readonly, ref } from 'vue-demi';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useConnections */
export function useConnections(parameters = {}) {
    const config = useConfig(parameters);
    const connections = ref(getConnections(config));
    const unsubscribe = watchConnections(config, {
        onChange(data) {
            connections.value = data;
        },
    });
    onScopeDispose(() => unsubscribe());
    return readonly(connections);
}
//# sourceMappingURL=useConnections.js.map