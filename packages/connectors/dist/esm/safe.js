import { ProviderNotFoundError, createConnector, } from '@wagmi/core';
import { getAddress, withTimeout } from 'viem';
safe.type = 'safe';
export function safe(parameters = {}) {
    const { shimDisconnect = false } = parameters;
    let provider_;
    let disconnect;
    return createConnector((config) => ({
        id: 'safe',
        name: 'Safe',
        type: safe.type,
        async connect() {
            const provider = await this.getProvider();
            if (!provider)
                throw new ProviderNotFoundError();
            const accounts = await this.getAccounts();
            const chainId = await this.getChainId();
            if (!disconnect) {
                disconnect = this.onDisconnect.bind(this);
                provider.on('disconnect', disconnect);
            }
            // Remove disconnected shim if it exists
            if (shimDisconnect)
                await config.storage?.removeItem('safe.disconnected');
            return { accounts, chainId };
        },
        async disconnect() {
            const provider = await this.getProvider();
            if (!provider)
                throw new ProviderNotFoundError();
            if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
            }
            // Add shim signalling connector is disconnected
            if (shimDisconnect)
                await config.storage?.setItem('safe.disconnected', true);
        },
        async getAccounts() {
            const provider = await this.getProvider();
            if (!provider)
                throw new ProviderNotFoundError();
            return (await provider.request({ method: 'eth_accounts' })).map(getAddress);
        },
        async getProvider() {
            // Only allowed in iframe context
            const isIframe = typeof window !== 'undefined' && window?.parent !== window;
            if (!isIframe)
                return;
            if (!provider_) {
                const { default: SDK } = await import('@safe-global/safe-apps-sdk');
                const sdk = new SDK(parameters);
                // `getInfo` hangs when not used in Safe App iFrame
                // https://github.com/safe-global/safe-apps-sdk/issues/263#issuecomment-1029835840
                const safe = await withTimeout(() => sdk.safe.getInfo(), {
                    timeout: parameters.unstable_getInfoTimeout ?? 10,
                });
                if (!safe)
                    throw new Error('Could not load Safe information');
                // Unwrapping import for Vite compatibility.
                // See: https://github.com/vitejs/vite/issues/9703
                const SafeAppProvider = await (async () => {
                    const Provider = await import('@safe-global/safe-apps-provider');
                    if (typeof Provider.SafeAppProvider !== 'function' &&
                        typeof Provider.default.SafeAppProvider === 'function')
                        return Provider.default.SafeAppProvider;
                    return Provider.SafeAppProvider;
                })();
                provider_ = new SafeAppProvider(safe, sdk);
            }
            return provider_;
        },
        async getChainId() {
            const provider = await this.getProvider();
            if (!provider)
                throw new ProviderNotFoundError();
            return Number(provider.chainId);
        },
        async isAuthorized() {
            try {
                const isDisconnected = shimDisconnect &&
                    // If shim exists in storage, connector is disconnected
                    (await config.storage?.getItem('safe.disconnected'));
                if (isDisconnected)
                    return false;
                const accounts = await this.getAccounts();
                return !!accounts.length;
            }
            catch {
                return false;
            }
        },
        onAccountsChanged() {
            // Not relevant for Safe because changing account requires app reload.
        },
        onChainChanged() {
            // Not relevant for Safe because Safe smart contract wallets only exist on single chain.
        },
        onDisconnect() {
            config.emitter.emit('disconnect');
        },
    }));
}
//# sourceMappingURL=safe.js.map