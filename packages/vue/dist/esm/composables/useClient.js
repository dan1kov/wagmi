import { getClient, watchClient, } from '@wagmi/core';
import { computed, onScopeDispose, readonly, ref, watchEffect, } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useClient */
export function useClient(parameters = {}) {
    const params = computed(() => deepUnref(parameters));
    const config = useConfig(params);
    const client = ref(getClient(config, params.value));
    watchEffect(() => {
        client.value = getClient(config, params.value);
    });
    const unsubscribe = watchClient(config, {
        onChange(data) {
            if (client.value?.uid === data?.uid)
                return;
            client.value = data;
        },
    });
    onScopeDispose(() => unsubscribe());
    return readonly(client);
}
//# sourceMappingURL=useClient.js.map