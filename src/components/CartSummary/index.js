import './index.css'

const CartSummary = props => {
  const {cartList} = props
  console.log('cart summ')
  console.log(cartList)
  const totalCartItemPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const totalCartItemQuantity = cartList.length
  return (
    <div className="cartSummary-container">
      <h1 className="total-cartItem-price">
        Order Total: <p>Rs {totalCartItemPrice}/-</p>
      </h1>

      <p className="total-cartItem-quantity">
        {totalCartItemQuantity} Items in cart
      </p>
      <button type="button" className="checkout-btn">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
