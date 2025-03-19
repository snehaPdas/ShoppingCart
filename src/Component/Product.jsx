import React, { useEffect, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function Product() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("cart updated", cart);
    const totals = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totals);
  }, [cart]);

  useEffect(() => {
    if (total >= THRESHOLD) {
      const hasGift = cart.find((item) => item.id === FREE_GIFT.id);
      if (!hasGift) {
        setCart((prev) => [...prev, { ...FREE_GIFT, quantity: 1 }]);
        setMessage("You got a free Wireless Mouse!");
      }
    } else {
      setCart((prev) => prev.filter((item) => item.id !== FREE_GIFT.id));
      setMessage("");
    }
  }, [total]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Shopping Cart</h1>
        
        {/* Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
                <span className="block font-medium text-lg mb-2">{product.name}</span>
                <span className="block text-gray-700 font-semibold mb-3">₹{product.price}</span>
                <button 
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                  onClick={() => addToCart(product)}
                >
                 
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Cart Summary</h2>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <span className="font-medium text-lg">Subtotal:</span>
              <span className="font-bold text-xl">₹{total}</span>
            </div>
            
            {message && (
            
                <p className="font-medium">{message}</p>
              
            )}
            
            {total < THRESHOLD && (
  <div className="bg-blue-50 p-4 rounded-lg mb-4">
    <div className="text-gray-700 font-medium mb-2">
      Add ₹{THRESHOLD - total} more to get a FREE Wireless Mouse!
    </div>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${Math.min(100, (total / THRESHOLD) * 100)}%` }}
      ></div>
    </div>
  </div>
)}
          </div>
        </div>

        {/* Cart Items */}
        {cart.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Cart Items</h2>
            {cart.map((item) => (
              <div 
                key={item.id} 
                className={`mt-2 p-4 bg-white shadow-md rounded-lg flex justify-between items-center
                 ₹{item.id === FREE_GIFT.id ? 'border-2 border-green-500' : ''}`}
              >
                <div>
                  <span className="font-medium text-lg block">{item.name}</span>
                  <span className="text-gray-600">
                   ₹{item.price} × {item.quantity} =₹{item.price * item.quantity}
                  </span>
                </div>
                
                {item.id !== FREE_GIFT.id && (
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="font-medium w-6 text-center">{item.quantity}</span>
                    <button 
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                )}
                
                {item.id === FREE_GIFT.id && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    FREE GIFT
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white shadow-md rounded-lg">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400 mt-2">Add some products to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;