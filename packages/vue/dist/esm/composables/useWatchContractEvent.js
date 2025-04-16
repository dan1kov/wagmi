import { watchContractEvent, } from '@wagmi/core';
import { computed, watchEffect } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useWatchContractEvent */
export function useWatchContractEvent(parameters = {}) {
    const parameters_ = computed(() => deepUnref(parameters));
    const config = useConfig(parameters_);
    const configChainId = useChainId({ config });
    watchEffect((onCleanup) => {
        const { chainId = configChainId.value, enabled = true, onLogs, config: _, ...rest } = parameters_.value;
        if (!enabled)
            return;
        if (!onLogs)
            return;
        const unwatch = watchContractEvent(config, {
            ...rest,
            chainId,
            onLogs,
        });
        onCleanup(unwatch);
    });
}
//# sourceMappingURL=useWatchContractEvent.js.map