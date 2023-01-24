import React, { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CartType } from '../../graphql/cart';
import { checkedCartState } from '../../recoils/cart';
import CartItem from './item';
import WillPay from '../willPay/willPay';
import { useNavigate } from 'react-router-dom';

const CartList = ({ items }: { items: CartType[] }) => {
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();
  const navigate = useNavigate();

  const enableItems = items.filter(item => item.product.createdAt);

  const setAllCheckedFromItems = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;
    const allchecked = selectedCount === enableItems.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allchecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs.filter(elem => !elem.current!.disabled).forEach((elem) => {
      elem.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e?.target as HTMLInputElement;
    if (targetInput && targetInput.classList.contains('select-all')) {
      setItemsCheckedFromAll(targetInput);
    } else {
      setAllCheckedFromItems();
    }

    const data = new FormData(formRef.current);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (checkedCartData.length) {
      navigate('/payment');
    } else {
      alert('결제할 대상이 없어요.');
    }
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRefs.find((ref) => ref.current!.dataset.id === item.id);
      if (itemRef) itemRef.current!.checked = true;
    });

    setAllCheckedFromItems();
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);

    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input className="select-all" name="select-all" type="checkbox" />
          전체선택
        </label>
        <ul className="cart">
          {items.map((item, index) => (
            <CartItem {...item} key={item.id} ref={checkboxRefs[index]} />
          ))}
        </ul>
      </form>
      <WillPay submitTitle='결제창으로' handleSubmit={handleSubmit} />
    </>
  );
};

export default CartList;
