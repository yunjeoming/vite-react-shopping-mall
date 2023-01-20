import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import useIntersection from '../../components/hooks/useIntersection';
import ProductList from '../../components/products/list';
import GET_PRODUCTS, { Products } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const ProductListPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Products>(
    QueryKeys.PRODUCTS,
    ({ pageParam = '' }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.products.at(-1)?.id;
      },
    }
  );

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

export default ProductListPage;
