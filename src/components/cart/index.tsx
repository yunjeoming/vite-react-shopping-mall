import React, { createRef, SyntheticEvent, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { CartType } from '../../graphql/cart';
import { checkedCartState } from '../../recoils/cart';
import CartItem from './item';

const CartList = ({ items }: { items: CartType[] }) => {
  const setCheckedCartData = useSetRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;

    if (targetInput.classList.contains('select-all')) {
      const allChecked = targetInput.checked;
      checkboxRefs.forEach((elem) => {
        elem.current!.checked = allChecked;
      });
    } else {
      const allchecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allchecked;
    }

    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);

    setCheckedCartData(checkedItems);
  };

  return (
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
  );
};

export default CartList;
