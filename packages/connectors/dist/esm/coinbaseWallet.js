import { ChainNotConfiguredError, createConnector, } from '@wagmi/core';
import { SwitchChainError, UserRejectedRequestError, getAddress, numberToHex, } from 'viem';
coinbaseWallet.type = 'coinbaseWallet';
export function coinbaseWallet(parameters = {}) {
    if (parameters.version === '3' || parameters.headlessMode)
        return version3(parameters);
    return version4(parameters);
}
function version4(parameters) {
    let walletProvider;
    let accountsChanged;
    let chainChanged;
    let disconnect;
    return createConnector((config) => ({
        id: 'coinbaseWalletSDK',
        name: 'Coinbase Wallet',
        rdns: 'com.coinbase.wallet',
        type: coinbaseWallet.type,
        async connect({ chainId, ...rest } = {}) {
            try {
                const provider = await this.getProvider();
                const accounts = (await provider.request({
                    method: 'eth_requestAccounts',
                    params: 'instantOnboarding' in rest && rest.instantOnboarding
                        ? [{ onboarding: 'instant' }]
                        : [],
                })).map((x) => getAddress(x));
                if (!accountsChanged) {
                    accountsChanged = this.onAccountsChanged.bind(this);
                    provider.on('accountsChanged', accountsChanged);
                }
                if (!chainChanged) {
                    chainChanged = this.onChainChanged.bind(this);
                    provider.on('chainChanged', chainChanged);
                }
                if (!disconnect) {
                    disconnect = this.onDisconnect.bind(this);
                    provider.on('disconnect', disconnect);
                }
                // Switch to chain if provided
                let currentChainId = await this.getChainId();
                if (chainId && currentChainId !== chainId) {
                    const chain = await this.switchChain({ chainId }).catch((error) => {
                        if (error.code === UserRejectedRequestError.code)
                            throw error;
                        return { id: currentChainId };
                    });
                    currentChainId = chain?.id ?? currentChainId;
                }
                return { accounts, chainId: currentChainId };
            }
            catch (error) {
                if (/(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(error.message))
                    throw new UserRejectedRequestError(error);
                throw error;
            }
        },
        async disconnect() {
            const provider = await this.getProvider();
            if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
            }
            if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
            }
            if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
            }
            provider.disconnect();
            provider.close?.();
        },
        async getAccounts() {
            const provider = await this.getProvider();
            return (await provider.request({
                method: 'eth_accounts',
            })).map((x) => getAddress(x));
        },
        async getChainId() {
            const provider = await this.getProvider();
            const chainId = (await provider.request({
                method: 'eth_chainId',
            }));
            return Number(chainId);
        },
        async getProvider() {
            if (!walletProvider) {
                const preference = (() => {
                    if (typeof parameters.preference === 'string')
                        return { options: parameters.preference };
                    return {
                        ...parameters.preference,
                        options: parameters.preference?.options ?? 'all',
                    };
                })();
                const { createCoinbaseWalletSDK } = await import('@coinbase/wallet-sdk');
                const sdk = createCoinbaseWalletSDK({
                    ...parameters,
                    appChainIds: config.chains.map((x) => x.id),
                    preference,
                });
                walletProvider = sdk.getProvider();
            }
            return walletProvider;
        },
        async isAuthorized() {
            try {
                const accounts = await this.getAccounts();
                return !!accounts.length;
            }
            catch {
                return false;
            }
        },
        async switchChain({ addEthereumChainParameter, chainId }) {
            const chain = config.chains.find((chain) => chain.id === chainId);
            if (!chain)
                throw new SwitchChainError(new ChainNotConfiguredError());
            const provider = await this.getProvider();
            try {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: numberToHex(chain.id) }],
                });
                return chain;
            }
            catch (error) {
                // Indicates chain is not added to provider
                if (error.code === 4902) {
                    try {
                        let blockExplorerUrls;
                        if (addEthereumChainParameter?.blockExplorerUrls)
                            blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                        else
                            blockExplorerUrls = chain.blockExplorers?.default.url
                                ? [chain.blockExplorers?.default.url]
                                : [];
                        let rpcUrls;
                        if (addEthereumChainParameter?.rpcUrls?.length)
                            rpcUrls = addEthereumChainParameter.rpcUrls;
                        else
                            rpcUrls = [chain.rpcUrls.default?.http[0] ?? ''];
                        const addEthereumChain = {
                            blockExplorerUrls,
                            chainId: numberToHex(chainId),
                            chainName: addEthereumChainParameter?.chainName ?? chain.name,
                            iconUrls: addEthereumChainParameter?.iconUrls,
                            nativeCurrency: addEthereumChainParameter?.nativeCurrency ??
                                chain.nativeCurrency,
                            rpcUrls,
                        };
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [addEthereumChain],
                        });
                        return chain;
                    }
                    catch (error) {
                        throw new UserRejectedRequestError(error);
                    }
                }
                throw new SwitchChainError(error);
            }
        },
        onAccountsChanged(accounts) {
            if (accounts.length === 0)
                this.onDisconnect();
            else
                config.emitter.emit('change', {
                    accounts: accounts.map((x) => getAddress(x)),
                });
        },
        onChainChanged(chain) {
            const chainId = Number(chain);
            config.emitter.emit('change', { chainId });
        },
        async onDisconnect(_error) {
            config.emitter.emit('disconnect');
            const provider = await this.getProvider();
            if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
            }
            if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
            }
            if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
            }
        },
    }));
}
function version3(parameters) {
    const reloadOnDisconnect = false;
    let sdk;
    let walletProvider;
    let accountsChanged;
    let chainChanged;
    let disconnect;
    return createConnector((config) => ({
        id: 'coinbaseWalletSDK',
        name: 'Coinbase Wallet',
        rdns: 'com.coinbase.wallet',
        type: coinbaseWallet.type,
        async connect({ chainId } = {}) {
            try {
                const provider = await this.getProvider();
                const accounts = (await provider.request({
                    method: 'eth_requestAccounts',
                })).map((x) => getAddress(x));
                if (!accountsChanged) {
                    accountsChanged = this.onAccountsChanged.bind(this);
                    provider.on('accountsChanged', accountsChanged);
                }
                if (!chainChanged) {
                    chainChanged = this.onChainChanged.bind(this);
                    provider.on('chainChanged', chainChanged);
                }
                if (!disconnect) {
                    disconnect = this.onDisconnect.bind(this);
                    provider.on('disconnect', disconnect);
                }
                // Switch to chain if provided
                let currentChainId = await this.getChainId();
                if (chainId && currentChainId !== chainId) {
                    const chain = await this.switchChain({ chainId }).catch((error) => {
                        if (error.code === UserRejectedRequestError.code)
                            throw error;
                        return { id: currentChainId };
                    });
                    currentChainId = chain?.id ?? currentChainId;
                }
                return { accounts, chainId: currentChainId };
            }
            catch (error) {
                if (/(user closed modal|accounts received is empty|user denied account)/i.test(error.message))
                    throw new UserRejectedRequestError(error);
                throw error;
            }
        },
        async disconnect() {
            const provider = await this.getProvider();
            if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
            }
            if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
            }
            if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
            }
            provider.disconnect();
            provider.close();
        },
        async getAccounts() {
            const provider = await this.getProvider();
            return (await provider.request({
                method: 'eth_accounts',
            })).map((x) => getAddress(x));
        },
        async getChainId() {
            const provider = await this.getProvider();
            const chainId = await provider.request({
                method: 'eth_chainId',
            });
            return Number(chainId);
        },
        async getProvider() {
            if (!walletProvider) {
                // Unwrapping import for Vite compatibility.
                // See: https://github.com/vitejs/vite/issues/9703
                const CoinbaseWalletSDK = await (async () => {
                    const { default: SDK } = await import('cbw-sdk');
                    if (typeof SDK !== 'function' && typeof SDK.default === 'function')
                        return SDK.default;
                    return SDK;
                })();
                sdk = new CoinbaseWalletSDK({ ...parameters, reloadOnDisconnect });
                // Force types to retrieve private `walletExtension` method from the Coinbase Wallet SDK.
                const walletExtensionChainId = sdk.walletExtension?.getChainId();
                const chain = config.chains.find((chain) => parameters.chainId
                    ? chain.id === parameters.chainId
                    : chain.id === walletExtensionChainId) || config.chains[0];
                const chainId = parameters.chainId || chain?.id;
                const jsonRpcUrl = parameters.jsonRpcUrl || chain?.rpcUrls.default.http[0];
                walletProvider = sdk.makeWeb3Provider(jsonRpcUrl, chainId);
            }
            return walletProvider;
        },
        async isAuthorized() {
            try {
                const accounts = await this.getAccounts();
                return !!accounts.length;
            }
            catch {
                return false;
            }
        },
        async switchChain({ addEthereumChainParameter, chainId }) {
            const chain = config.chains.find((chain) => chain.id === chainId);
            if (!chain)
                throw new SwitchChainError(new ChainNotConfiguredError());
            const provider = await this.getProvider();
            try {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: numberToHex(chain.id) }],
                });
                return chain;
            }
            catch (error) {
                // Indicates chain is not added to provider
                if (error.code === 4902) {
                    try {
                        let blockExplorerUrls;
                        if (addEthereumChainParameter?.blockExplorerUrls)
                            blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                        else
                            blockExplorerUrls = chain.blockExplorers?.default.url
                                ? [chain.blockExplorers?.default.url]
                                : [];
                        let rpcUrls;
                        if (addEthereumChainParameter?.rpcUrls?.length)
                            rpcUrls = addEthereumChainParameter.rpcUrls;
                        else
                            rpcUrls = [chain.rpcUrls.default?.http[0] ?? ''];
                        const addEthereumChain = {
                            blockExplorerUrls,
                            chainId: numberToHex(chainId),
                            chainName: addEthereumChainParameter?.chainName ?? chain.name,
                            iconUrls: addEthereumChainParameter?.iconUrls,
                            nativeCurrency: addEthereumChainParameter?.nativeCurrency ??
                                chain.nativeCurrency,
                            rpcUrls,
                        };
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [addEthereumChain],
                        });
                        return chain;
                    }
                    catch (error) {
                        throw new UserRejectedRequestError(error);
                    }
                }
                throw new SwitchChainError(error);
            }
        },
        onAccountsChanged(accounts) {
            if (accounts.length === 0)
                this.onDisconnect();
            else
                config.emitter.emit('change', {
                    accounts: accounts.map((x) => getAddress(x)),
                });
        },
        onChainChanged(chain) {
            const chainId = Number(chain);
            config.emitter.emit('change', { chainId });
        },
        async onDisconnect(_error) {
            config.emitter.emit('disconnect');
            const provider = await this.getProvider();
            if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
            }
            if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
            }
            if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
            }
        },
    }));
}
//# sourceMappingURL=coinbaseWallet.js.map