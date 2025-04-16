import { useMutation } from '@tanstack/vue-query';
import { switchAccountMutationOptions, } from '@wagmi/core/query';
import { computed } from 'vue-demi';
import { useConfig } from './useConfig.js';
import { useConnections } from './useConnections.js';
/** https://wagmi.sh/vue/api/composables/useSwitchAccount */
export function useSwitchAccount(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const connections = useConnections({ config });
    const mutationOptions = switchAccountMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        connectors: computed(() => connections.value.map((connection) => connection.connector)),
        switchAccount: mutate,
        switchAccountAsync: mutateAsync,
    };
}
//# sourceMappingURL=useSwitchAccount.js.map