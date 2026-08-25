import { CartProduct } from '../../../../types/CartProduct';
import style from './CartItems.module.scss';
import cn from 'classnames';
import { ImageWithSkeleton } from '../../../../components/ImageWithSkeleton';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../../../store/slices/cartSlice';

export const CartItems = () => {
  const cart = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const handleMinus = (item: CartProduct) => {
    dispatch(decreaseQuantity(item.itemId));
  };

  const handlePlus = (item: CartProduct) => {
    dispatch(increaseQuantity(item.itemId));
  };

  const handleDelete = (item: CartProduct) => {
    dispatch(removeFromCart(item.itemId));
  };

  return (
    <div className={style.items}>
      {cart.map(item => (
        <div className={cn(style.items__item, style.item)} key={item.itemId}>
          <div className={style.item__content}>
            <div className={style.item__left}>
              <button
                className={style.item__remove}
                onClick={() => handleDelete(item)}
              ></button>
              <ImageWithSkeleton
                src={item.image}
                alt={item.name}
                className={style.item__img}
              />
              <p className={style.item__name}>{item.name}</p>
            </div>
            <div className={style.item__right}>
              <div className={style.item__count}>
                <button
                  className={cn(
                    style.item__button,
                    style['item__button--minus'],
                    {
                      [style['item__button--disabled']]: item.quantity === 1,
                    },
                  )}
                  onClick={() => handleMinus(item)}
                ></button>
                <p className={style.item__amount}>{item.quantity}</p>
                <button
                  className={cn(
                    style.item__button,
                    style['item__button--plus'],
                  )}
                  onClick={() => handlePlus(item)}
                ></button>
              </div>
              <h3 className={style.item__total}>
                ${item.price * item.quantity}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
