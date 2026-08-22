# BUGS.md

## Exploratory Session Summary

I used **Equivalence Partitioning** and **Error Guessing** for the login and checkout forms, since these fields have a set of valid/invalid input classes (empty fields, valid vs. invalid credentials).
I used **State Transition Testing** to cover the core user flow (login - cart state - checkout steps - order completion - back to inventory), because there is a risk of losing cart state between these steps.
I used **Exploratory Testing** to understand the app better and find unexpected cases.
I used **Boundary Value Analysis** to test the cart item count, checking the minimum (1 item) and maximum (6 items, since the Inventory page offers exactly 6 products)

---

## BUG-001 - Checkout can be started with an empty cart

**Environment**

- Browser: Google Chrome v.151.0.7922.77
- OS: Windows
- Viewport: 1920 X 953

**Severity:** Major

**Priority:** High - A user can enter the checkout flow without having any products in the cart, which creates an invalid purchase flow and may lead to an order process without order items.

### Preconditions

1. Open app (https://www.saucedemo.com/) and login with valid creds (`standard_user`, `secret_sauce`).
2. Cart is empty.
3. Navigate to Cart page.

### Steps to Reproduce

1. Click the **Checkout** button.

### Expected Result

The **Checkout** button should be disabled with an empty cart. The user should remain on the Cart page and the checkout flow should not be started.

### Actual Result

The **Checkout** button is enabled and can be clicked. The application navigates the user to the checkout flow even though the cart contains no products.

### Attachment

`attachments/checkout.png`

---

## BUG-002 - Incorrect error message when Username and Password are both empty

**Environment**

- Browser: Google Chrome v.151.0.7922.77
- OS: Windows
- Viewport: 1920 X 953

**Severity:** Minor

**Priority:** Low - Authentication is correctly prevented, but the validation message does not accurately describe the two missing required fields.

### Preconditions

1. Login page is opened (https://www.saucedemo.com/).
2. User is not authenticated.

### Steps to Reproduce

1. Leave the **Username** field empty.
2. Leave the **Password** field empty.
3. Click the **Login** button.

### Expected Result

The application should display an error message indicating that both required fields are missing:

`Epic sadface: Username and Password are required`

### Actual Result

The application displays:

`Epic sadface: Username is required`

### Attachment

`attachments/login.png`

---

## BUG-003 - Incorrect error message when all Checkout information fields are empty

**Environment**

- Browser: Google Chrome v.151.0.7922.77
- OS: Windows
- Viewport: 1920 X 953

**Severity:** Minor

**Priority:** Low - The application correctly prevents the user from proceeding, but the validation message does not identify all missing required fields.

### Preconditions

1. Open app (https://www.saucedemo.com/) and login with valid creds (`standard_user`, `secret_sauce`).
2. Cart contains at least one product.
3. User is on Checkout-step-one page.

### Steps to Reproduce

1. Leave **First Name**, **Last Name**, **Zip/Postal Code** fields empty.
2. Click the **Continue** button.

### Expected Result

The application should display an error message indicating that all required fields are missing:

`Error: First Name, Last Name and Postal Code are required`

The user should remain on the Checkout: Your Information page.

### Actual Result

The application displays:

`Error: First Name is required`

### Attachment

`attachments/information.png`

---

## BUG-004 - Item total displays floating-point precision error on checkout-step-two page

**Environment**

- Browser: Google Chrome v.151.0.7922.77
- OS: Windows
- Viewport: 1920 X 953

**Severity:** Minor
**Priority:** Medium - the financial value and error affects the credibility of the calculations

### Preconditions

1. Open app (https://www.saucedemo.com/) and login with valid creds (`standard_user`, `secret_sauce`).
2. Add to cart products with price $49.99 and $9.99
3. Navigate to cart -> checkout on cart page
4. Fill information on checkout-step-one page

### Steps to Reproduce

1. Find Item total value on checkout-step-two page

### Expected Result

Item total is correctly rounded to two decimal places
($59.98)

### Actual Result

Item total is displayed with a floating-point precision error
($59.980000000000004)

### Attachment

`attachments/item_total.png`

---

## BUG-005 - "Generate PDF order" button is missing on Complete page

**Environment**

- Browser: Google Chrome v.151.0.7922.77 (issue not reproduced in Mozilla Firefox, same version of the site)
- OS: Windows
- Viewport: 1920 X 953

**Severity:** Major

**Priority:** High - A core action on the order confirmation page is unavailable to a portion of users, with no visible indication that the feature exists or failed to load.

### Preconditions

1. Open app (https://www.saucedemo.com/) and login with valid creds (`standard_user`, `secret_sauce`).
2. Cart contains at least one product.
3. Complete the checkout flow.

### Steps to Reproduce

1. Land on the Checkout: Complete page (`checkout-complete.html`).
2. Observe the buttons displayed under "Thank you for your order!".
3. Compare with the same page opened in Mozilla Firefox.

### Expected Result

It is possible to click on the "Generate PDF order" button and download the file.

### Actual Result

There is no "Generate PDF order" button and it is impossible to download the file.

### Attachment

`attachments/download_c.png`  
`attachments/download_f.png`
