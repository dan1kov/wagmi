import { type DefaultError, type MutationObserverOptions, type QueryKey, type UseQueryOptions, type UseMutationReturnType as tanstack_UseMutationReturnType, type UseQueryReturnType as tanstack_UseQueryReturnType, useMutation } from '@tanstack/vue-query';
import type { Compute, ExactPartial, Omit, UnionStrictOmit } from '@wagmi/core/internal';
import { type MaybeRef } from 'vue-demi';
import type { DeepMaybeRef, DeepUnwrapRef } from '../types/ref.js';
export type UseMutationParameters<data = unknown, error = Error, variables = void, context = unknown> = Compute<DeepMaybeRef<Omit<DeepUnwrapRef<MutationObserverOptions<data, error, Compute<variables>, context>>, 'mutationFn' | 'mutationKey' | 'throwOnError'>>>;
export type UseMutationReturnType<data = unknown, error = Error, variables = void, context = unknown> = Compute<UnionStrictOmit<tanstack_UseMutationReturnType<data, error, variables, context>, 'mutate' | 'mutateAsync'>>;
export { useMutation };
export type UseQueryParameters<queryFnData = unknown, error = DefaultError, data = queryFnData, queryKey extends QueryKey = QueryKey> = Compute<DeepMaybeRef<ExactPartial<Omit<DeepUnwrapRef<UseQueryOptions<queryFnData, error, data, queryFnData, queryKey>>, 'initialData'>> & {
    initialData?: DeepUnwrapRef<UseQueryOptions<queryFnData, error, data, queryFnData, queryKey>>['initialData'] | undefined;
}>>;
export type UseQueryReturnType<data = unknown, error = DefaultError> = Compute<tanstack_UseQueryReturnType<data, error> & {
    queryKey: QueryKey;
}>;
export declare function useQuery<queryFnData, error, data, queryKey extends QueryKey>(parameters: MaybeRef<UseQueryParameters<queryFnData, error, data, queryKey> & {
    queryKey: QueryKey;
}>): UseQueryReturnType<data, error>;
//# sourceMappingURL=query.d.ts.map