export function increaseQty(id) {

  return {
    type: 'INCREASE_QTY',
    payload: id
  }

}

export function decreaseQty(id) {

  return {
    type: 'DECREASE_QTY',
    payload: id
  }

}

export function deleteItem(id) {

  return {
    type: 'DElETE_ITEM',
    payload: id
  }

}

export function addItem(item) {

  return {
    type: 'ADD_ITEM',
    payload: item
  }

}
