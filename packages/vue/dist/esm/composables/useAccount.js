import { getAccount, watchAccount, } from '@wagmi/core';
import { onScopeDispose, reactive, readonly, toRefs, } from 'vue-demi';
import { updateState } from '../utils/updateState.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useAccount */
export function useAccount(parameters = {}) {
    const config = useConfig(parameters);
    const account = reactive(getAccount(config));
    const unsubscribe = watchAccount(config, {
        onChange(data) {
            updateState(account, data);
        },
    });
    onScopeDispose(() => unsubscribe());
    return toRefs(readonly(account));
}
//# sourceMappingURL=useAccount.js.map