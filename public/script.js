var ShoppingCart = function () {

  // an array with all of our cart items
  var cart = [];

  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.

    $('div.cart-list').empty();
    var totalPrice = 0;
    $('span.total').text(totalPrice);

    for (var i = 0; i < cart.length; ++i) {
      $('div.cart-list').append("<div class=\"row\"><p>" + cart[i].name + ' - ' + cart[i].price +
        " </p><button  type=\"button\" class=\"btn remove-item\">Remove </button></div>");
      totalPrice += cart[i].price;
      $('span.total').text(totalPrice);
    }

  }

  var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
     var grandparents = $(item).parent().parent();
   var _name = $(grandparents).data().name;
   var _price = $(grandparents).data().price;
    cart.push({ name: _name, price: _price });
  }

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    cart = [];
    this.updateCart();
  }

  var removeItem = function (element) {
    // TODO: Write a function that remove the item ;-)  
    var nameOfItem = $(element).prev().text().split(' - ');
    var index = cart.findIndex(x => x.name === nameOfItem[0]);
    if (index > -1) {
      cart.splice(index, 1);
    }
    updateCart();
  }

  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    removeItem: removeItem
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  /* var grandparents = $(this).parent().parent();
  var name = $(grandparents).data().name;
  var price = $(grandparents).data().price; */
  var item = $(this);
  app.addItem(item);
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

$('body').delegate('.remove-item', 'click', function () {
  app.removeItem(this);
});