import React, { SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { ADD_PRODUCT, MutableProduct } from '../../graphql/products';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import arrToObj from '../../util/arrToObj';

const AddForm = () => {
  const queryClient = getClient();
  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    {
      onSuccess: () => {
        // 응답을 다시 하지 않고 서버에 다시 요청하여 상세 동기화를 맞추는 방식
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, { exact: false, refetchInactive: true });
      },
    }
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);

    addProduct(formData as MutableProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {' '}
        상품명: <input name='title' type='text' required />
      </label>
      <label>
        {' '}
        이미지URL: <input name='imageUrl' type='text' required />
      </label>
      <label>
        {' '}
        상품가격: <input name='price' type='number' min='1000' required />
      </label>
      <label>
        {' '}
        상세: <textarea name='description' />
      </label>
      <button type='submit'>등록</button>
    </form>
  );
};

export default AddForm;
