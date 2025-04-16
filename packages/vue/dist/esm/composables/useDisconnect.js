import { useMutation } from '@tanstack/vue-query';
import { disconnectMutationOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { useConfig } from './useConfig.js';
import { useConnections } from './useConnections.js';
/** https://wagmi.sh/vue/api/composables/useDisconnect */
export function useDisconnect(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const connections = useConnections({ config });
    const mutationOptions = disconnectMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        connectors: computed(() => connections.value.map((connection) => connection.connector)),
        disconnect: mutate,
        disconnectAsync: mutateAsync,
    };
}
//# sourceMappingURL=useDisconnect.js.map