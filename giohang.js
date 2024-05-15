document.addEventListener("DOMContentLoaded", function() {
  const orderItemsList = document.getElementById("order-items");
  const totalPriceElement = document.getElementById("total-price");
  const cancelOrderBtn = document.getElementById("cancel-order-btn");
  
  // Lấy thông tin sản phẩm từ Local Storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
  // Hiển thị thông tin sản phẩm trên trang đơn hàng
  cartItems.forEach(function(item) {
      const listItem = document.createElement("li");
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = item.quantity;
      quantityInput.min = 1;
      quantityInput.addEventListener("change", function() {
          // Cập nhật số lượng khi số lượng thay đổi
          item.quantity = parseInt(this.value);
          updateCart();
      });
      
      listItem.textContent = `${item.name} - ${item.price} đ`;
      listItem.appendChild(quantityInput);
      orderItemsList.appendChild(listItem);
  });
  
  // Tính tổng giá của đơn hàng
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  totalPriceElement.textContent = `Tổng giá: ${totalPrice} đ`;
  
  // Gắn sự kiện cho nút "Huỷ đơn"
  cancelOrderBtn.addEventListener("click", function() {
      // Xoá toàn bộ sản phẩm khỏi trang đơn hàng
      orderItemsList.innerHTML = "";
      // Xoá thông tin từ Local Storage
      localStorage.removeItem("cartItems");
      // Cập nhật tổng giá
      totalPriceElement.textContent = "Tổng giá: 0 đ";
  });
  
  // Cập nhật Local Storage khi có thay đổi trong giỏ hàng
  function updateCart() {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      totalPriceElement.textContent = `Tổng giá: ${totalPrice} đ`;
  }
});
