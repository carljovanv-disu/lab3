function calculateItemAmount(price, quantity) {
    return price * quantity;
}


function calculateDiscount(subtotal) {

    let discount = 0;

    if (subtotal >= 5000) {
        discount = subtotal * 0.10;
    } else if (subtotal >= 3000) {
        discount = subtotal * 0.07;
    } else if (subtotal >= 1000) {
        discount = subtotal * 0.05;
    } else {
        discount = 0;
    }

    return discount;
}

function getDeliveryFee(option) {
    switch (Number(option)) {
        case 1:
            return 0;
        case 2:
            return 80;
        case 3:
            return 150;
        default:
            return 0;
    }
}

const customerNameInput = document.getElementById("customerName");
const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const deliveryOptionInput = document.getElementById("deliveryOption");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

productCountInput.addEventListener("input", function () {
    const productCount = Number(productCountInput.value);
    productsContainer.innerHTML = "";
    if (Number.isInteger(productCount) && productCount > 0) {
        for (let i = 0; i < productCount; i++) {
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>
                <label for="productName-${i}">
                    Product Name
                </label>
                <input 
                    type="text" 
                    id="productName-${i}"
                >
                <br>
                <label for="productPrice-${i}">
                    Price
                </label>
                <input 
                    type="number" 
                    id="productPrice-${i}"
                    min="0"
                    step="0.01"
                >
                <br>
                <label for="productQuantity-${i}">
                    Quantity
                </label>
                <input 
                    type="number" 
                    id="productQuantity-${i}"
                    min="1"
                    step="1"
                >
                <br><br>
            `;
            productsContainer.appendChild(productDiv);
        }
    }
});

calculateBtn.addEventListener("click", function () {
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";
    const customerName = customerNameInput.value.trim();

    if (customerName === "") {

        validationMessage.textContent =
            "Please enter the Customer Name.";
        return;
    }

    const productCount = Number(productCountInput.value);
    if (
        !Number.isInteger(productCount) ||
        productCount <= 0
    ) {
        
        validationMessage.textContent =
            "Please enter a valid positive Number of Products.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";
    for (let i = 0; i < productCount; i++) {
        const productNameInput =
            document.getElementById(`productName-${i}`);
        const productPriceInput =
            document.getElementById(`productPrice-${i}`);
        const productQuantityInput =
            document.getElementById(`productQuantity-${i}`);
        const productName =
            productNameInput.value.trim();
        const price =
            Number(productPriceInput.value);
        const quantity =
            Number(productQuantityInput.value);

        if (productName === "") {
            validationMessage.textContent =
                `Please enter the Product Name for product ${i + 1}.`;
            return;
        }

        if (
            !Number.isFinite(price) ||
            price <= 0
        ) {

            validationMessage.textContent =
                `Please enter a valid positive Price for product ${i + 1}.`;
            return;
        }

        if (
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {

            validationMessage.textContent =
                `Please enter a valid positive Quantity for product ${i + 1}.`;
            return;
        }
        
        const itemAmount =
            calculateItemAmount(price, quantity);
        subtotal += itemAmount;
        productDetails += `
            <div>
                <p>
                    <strong>${i + 1}. ${productName}</strong>
                </p>
                <p>
                    Price: ₱${price.toFixed(2)}
                </p>
                <p>
                    Quantity: ${quantity}
                </p>
                <p>
                    Amount: ₱${itemAmount.toFixed(2)}
                </p>
                <hr>
            </div>
        `;
    }


    const discountAmount =
        calculateDiscount(subtotal);
    let discountRate = 0;
    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }

    const deliveryOption =
        deliveryOptionInput.value;
    const deliveryFee =
        getDeliveryFee(deliveryOption);

    let deliveryType = "";
    switch (Number(deliveryOption)) {
        case 1:
            deliveryType = "Store Pickup";
            break;
        case 2:
            deliveryType = "Standard Delivery";
            break;
        case 3:
            deliveryType = "Express Delivery";
            break;
        default:
            deliveryType = "Unknown";
    }

    const finalAmount =
        subtotal - discountAmount + deliveryFee;

    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>
        <p>
            <strong>Customer:</strong>
            ${customerName}
        </p>
        ${productDetails}
        <p>
            <strong>Subtotal:</strong>
            ₱${subtotal.toFixed(2)}
        </p>
        <p>
            <strong>Discount Rate:</strong>
            ${discountRate}%
        </p>
        <p>
            <strong>Discount Amount:</strong>
            ₱${discountAmount.toFixed(2)}
        </p>
        <p>
            <strong>Delivery Type:</strong>
            ${deliveryType}
        </p>
        <p>
            <strong>Delivery Fee:</strong>
            ₱${deliveryFee.toFixed(2)}
        </p>
        <hr>

        <h3>
            Final Amount:
            ₱${finalAmount.toFixed(2)}
        </h3>
    `;
});
