import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import GET_PRODUCTS, { Products } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import useIntersection from '../hooks/useIntersection';
import ProductList from '../products/list';
import AddForm from './addForm';
import AdminItem from './item';
import AdminList from './list';

const Admin = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
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

  const startEdit = (index: number) => () => setEditingIndex(index);
  const doneEdit = () => setEditingIndex(null);

  return (
    <>
      <AddForm />
      <AdminList list={data?.pages || []} editingIndex={editingIndex} startEdit={startEdit} doneEdit={doneEdit}/>
      <div ref={fetchMoreRef}></div>
    </>
  );
};

export default Admin;
