const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const closeDialogX = document.getElementById('close-dialog-x');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

function openOrderForm(productName) {
  selectedProductInput.value = productName || '';
  successMessage.hidden = true;
  orderDialog.showModal();
}

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openOrderForm(button.dataset.product);
  });
});

function closeOrderForm() {
  orderDialog.close();
}

closeDialogButton.addEventListener('click', closeOrderForm);
closeDialogX.addEventListener('click', closeOrderForm);

// Закрытие окна по нажатию на затемнённую область.
orderDialog.addEventListener('click', (event) => {
  if (event.target === orderDialog) {
    orderDialog.close();
  }
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formElements = Array.from(orderForm.elements);
  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });
    orderForm.reportValidity();
    return;
  }

  // Backend не подключён: показываем демонстрационное подтверждение.
  successMessage.hidden = false;
  orderForm.reset();
  orderDialog.close();
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
