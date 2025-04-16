import { useMutation } from '@tanstack/vue-query';
import { connectMutationOptions, } from '@wagmi/core/query';
import { onScopeDispose } from 'vue-demi';
import { useConfig } from './useConfig.js';
import { useConnectors } from './useConnectors.js';
/** https://wagmi.sh/vue/api/composables/useConnect */
export function useConnect(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = connectMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    // Reset mutation back to an idle state when the connector disconnects.
    const unsubscribe = config.subscribe(({ status }) => status, (status, previousStatus) => {
        if (previousStatus === 'connected' && status === 'disconnected')
            result.reset();
    });
    onScopeDispose(() => unsubscribe());
    return {
        ...result,
        connect: mutate,
        connectAsync: mutateAsync,
        connectors: useConnectors({ config }).value,
    };
}
//# sourceMappingURL=useConnect.js.map