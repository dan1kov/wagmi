import { watchAccount } from '@wagmi/core';
import { watchEffect } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useAccountEffect */
export function useAccountEffect(parameters = {}) {
    const config = useConfig(parameters);
    watchEffect((onCleanup) => {
        const { onConnect, onDisconnect } = deepUnref(parameters);
        const unwatch = watchAccount(config, {
            onChange(data, prevData) {
                if ((prevData.status === 'reconnecting' ||
                    (prevData.status === 'connecting' &&
                        prevData.address === undefined)) &&
                    data.status === 'connected') {
                    const { address, addresses, chain, chainId, connector } = data;
                    const isReconnected = prevData.status === 'reconnecting' ||
                        // if `previousAccount.status` is `undefined`, the connector connected immediately.
                        prevData.status === undefined;
                    onConnect?.({
                        address,
                        addresses,
                        chain,
                        chainId,
                        connector,
                        isReconnected,
                    });
                }
                else if (prevData.status === 'connected' &&
                    data.status === 'disconnected')
                    onDisconnect?.();
            },
        });
        onCleanup(() => unwatch());
    });
}
//# sourceMappingURL=useAccountEffect.js.map