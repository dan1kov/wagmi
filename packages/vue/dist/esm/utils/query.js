import { useQuery as tanstack_useQuery, useMutation, } from '@tanstack/vue-query';
import { hashFn } from '@wagmi/core/query';
import { computed, unref } from 'vue-demi';
export { useMutation };
// Adding some basic customization.
// Ideally we don't have this function, but `import('@tanstack/vue-query').useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function useQuery(parameters) {
    const options = computed(() => ({
        ...unref(parameters),
        queryKeyHashFn: hashFn,
    }));
    const result = tanstack_useQuery(options);
    result.queryKey = unref(options).queryKey;
    return result;
}
////////////////////////////////////////////////////////////////////////////////
// export type UseInfiniteQueryParameters<
//   queryFnData = unknown,
//   error = DefaultError,
//   data = queryFnData,
//   queryData = queryFnData,
//   queryKey extends QueryKey = QueryKey,
//   pageParam = unknown,
// > = Compute<
//   Omit<
//     UseInfiniteQueryOptions<
//       queryFnData,
//       error,
//       data,
//       queryData,
//       queryKey,
//       pageParam
//     >,
//     'initialData'
//   > & {
//     // Fix `initialData` type
//     initialData?:
//       | UseInfiniteQueryOptions<
//           queryFnData,
//           error,
//           data,
//           queryKey
//         >['initialData']
//       | undefined
//   }
// >
// export type UseInfiniteQueryReturnType<
//   data = unknown,
//   error = DefaultError,
// > = import('@tanstack/vue-query').UseInfiniteQueryReturnType<data, error> & {
//   queryKey: QueryKey
// }
// // Adding some basic customization.
// export function useInfiniteQuery<
//   queryFnData,
//   error,
//   data,
//   queryKey extends QueryKey,
// >(
//   parameters: UseInfiniteQueryParameters<queryFnData, error, data, queryKey> & {
//     queryKey: QueryKey
//   },
// ): UseInfiniteQueryReturnType<data, error> {
//   const result = tanstack_useInfiniteQuery({
//     ...(parameters as any),
//     queryKeyHashFn: hashFn, // for bigint support
//   }) as UseInfiniteQueryReturnType<data, error>
//   result.queryKey = parameters.queryKey
//   return result
// }
//# sourceMappingURL=query.js.map