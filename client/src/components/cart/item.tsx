import React, { ForwardedRef, forwardRef, SyntheticEvent } from 'react';
import { Query, useMutation } from 'react-query';
import { CartType, DELETE_CART, UPDATE_CART } from '../../graphql/cart';
import ItemData from './itemData';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';

const CartItem = (
  { id, product: { imageUrl, price, title, createdAt }, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);
        const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>(QueryKeys.CART) || { cart: [] };
        if (!prevCart) return null;
        const targetIndex = prevCart.findIndex((cartItem) => cartItem.id === id);
        if (targetIndex === undefined || targetIndex < 0) return prevCart;

        const newCart = [...prevCart];
        newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount });
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart });

        return prevCart;
      },
      onSuccess: ({ updateCart }) => {
        const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>(QueryKeys.CART) || { cart: [] };
        const targetIndex = prevCart?.findIndex((cartItem) => cartItem.id === updateCart.id);
        if (!prevCart || targetIndex === undefined || targetIndex < 0) return;

        const newCart = [...prevCart];
        newCart.splice(targetIndex, 1, updateCart);
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
      },
    }
  );

  const { mutate: deleteCart } = useMutation(({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }), {
    onSuccess: () => {
      // delete 후 get으로 다시 가져옴
      queryClient.invalidateQueries(QueryKeys.CART);
    },
  });

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id });
  };
  return (
    <li className='cart-item'>
      <input className='cart-item__checkbox' type='checkbox' name={`select-item`} ref={ref} data-id={id} disabled={!createdAt} />
      <ItemData imageUrl={imageUrl} price={price} title={title} />
      {!createdAt ? <span>삭제된 상품</span> : <input type='number' className='cart-item__amount' value={amount} onChange={handleUpdateAmount} min='1' />}
      <button type='button' className='cart-item__button' onClick={handleDeleteItem}>
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
