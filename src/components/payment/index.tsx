import React from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoils/cart';
import WillPay from '../willPay/willPay';

const Payment = () => {
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);

  const showModal = () => {

  }

  return <WillPay submitTitle='결제하기' handleSubmit={showModal} />;
};

export default Payment;
