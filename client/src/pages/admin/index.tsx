import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import useIntersection from '../../components/hooks/useIntersection';
import AdminItem from '../../components/admin/item';
import ProductList from '../../components/products/list';
import GET_PRODUCTS, { Products } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import AddForm from '../../components/admin/addForm';

const AdminPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Products>(
    [QueryKeys.PRODUCTS, 'admin'],
    ({ pageParam = '' }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam, showDeleted: true }),
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
      <h2>어드민</h2>
      <AddForm />
      <ProductList list={data?.pages || []} Item={AdminItem} />
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

export default AdminPage;
