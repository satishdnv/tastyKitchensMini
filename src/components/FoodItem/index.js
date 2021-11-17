import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import itemClass from './FoodItem.module.css'
import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
  }

  // get the local storage data
  componentDidMount() {
    this.findTheCartItemInList()
  }

  /* getTheLocalStorageData = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list')) || []
    // console.log(cartList)
    this.setState({cartList})
  } */

  /* Add to cart when click on add button. this will
  store in local storage */

  findTheCartItemInList = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list')) || []
    const {foodItem} = this.props
    const cartItem = cartList.filter(each => each.id === foodItem.id)
    // console.log(cartItem)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity <= 0) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  incrementCartItemQuantity = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list'))
    const {foodItem} = this.props
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        if (eachItem.quantity <= 9) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cart_list', JSON.stringify(updatedCartList))
    this.findTheCartItemInList()
  }

  decrementCartItemQuantity = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list'))
    const {foodItem} = this.props
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cart_list', JSON.stringify(updatedCartList))
    this.findTheCartItemInList()
  }

  removeCartItem = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list'))
    const {foodItem} = this.props
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== foodItem.id,
    )
    localStorage.setItem('cart_list', JSON.stringify(updatedCartList))
    this.findTheCartItemInList()
  }

  addCartItem = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list')) || []
    const {foodItem} = this.props
    // console.log(foodItem)
    const cartItem = {...foodItem, quantity: 1}
    // console.log(cartItem)
    cartList.push(cartItem)
    localStorage.setItem('cart_list', JSON.stringify(cartList))
    this.findTheCartItemInList()
  }

  render() {
    const {foodItem} = this.props
    const {isFound, quantity} = this.state
    console.log(quantity)
    return (
      <li className={itemClass.ListItem}>
        <img
          src={foodItem.imageUrl}
          alt="food-item"
          className={itemClass.RestaurantImage}
        />
        <div className={itemClass.ItemDetails}>
          <h1 className={itemClass.ItemName}>{foodItem.name}</h1>
          <div className={itemClass.ItemRateContainer}>
            <BiRupee className={itemClass.ItemRupee} />
            <p className={itemClass.ItemCost}>{foodItem.cost}</p>
          </div>
          <div className={itemClass.ItemRatingContainer}>
            <AiFillStar className={itemClass.ItemStar} />
            <p className={itemClass.ItemRatingText}>{foodItem.rating}</p>
          </div>
          {isFound ? (
            <div className="each-item-counter-container" id={foodItem.id}>
              <div className="minus-icon-container">
                <HiOutlineMinusSm
                  className="minus-icon"
                  onClick={this.decrementCartItemQuantity}
                />
              </div>
              <p className="count-value">{quantity}</p>
              <div className="plus-icon-container">
                <BsPlus
                  className="plus-icon"
                  onClick={this.incrementCartItemQuantity}
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              className={itemClass.AddButton}
              onClick={this.addCartItem}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
