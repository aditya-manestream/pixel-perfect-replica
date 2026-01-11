// Order Confirmation Email Template
// This is an HTML template for order confirmation emails

interface OrderItem {
  name: string;
  color: string;
  quantity: number;
  price: number;
}

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  estimatedDelivery: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

export const generateOrderConfirmationEmail = (data: OrderEmailData): string => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Ardori</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Georgia', 'Times New Roman', serif; background-color: #FAF8F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #1A1A1A;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 400; letter-spacing: 4px; color: #FAF8F5;">
                ARDORI
              </h1>
            </td>
          </tr>
          
          <!-- Thank You Message -->
          <tr>
            <td align="center" style="padding: 50px 40px 30px; background-color: #FFFFFF;">
              <h2 style="margin: 0 0 15px; font-size: 26px; font-weight: 400; color: #1A1A1A; letter-spacing: 1px;">
                Thank You for Your Order!
              </h2>
              <p style="margin: 0; font-size: 16px; color: #6B6B6B; line-height: 1.6;">
                Dear ${data.customerName}, we're thrilled to have you as part of the Ardori family.
              </p>
            </td>
          </tr>
          
          <!-- Order Number -->
          <tr>
            <td align="center" style="padding: 0 40px 30px; background-color: #FFFFFF;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px 30px; background-color: #F5F2EF; text-align: center;">
                    <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #8B7355; font-family: 'Arial', sans-serif;">
                      Order Number
                    </p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1A1A1A; font-family: 'Arial', sans-serif;">
                      ${data.orderNumber}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Items -->
          <tr>
            <td style="padding: 30px 40px; background-color: #FFFFFF; border-top: 1px solid #E8E4DF;">
              <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 400; color: #1A1A1A;">
                Order Details
              </h3>
              ${data.items.map(item => `
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                  <tr>
                    <td style="width: 70%;">
                      <p style="margin: 0 0 5px; font-size: 16px; color: #1A1A1A;">
                        ${item.name}
                      </p>
                      <p style="margin: 0; font-size: 14px; color: #8B7355;">
                        ${item.color} × ${item.quantity}
                      </p>
                    </td>
                    <td style="width: 30%; text-align: right; vertical-align: top;">
                      <p style="margin: 0; font-size: 16px; color: #1A1A1A;">
                        ${formatPrice(item.price * item.quantity)}
                      </p>
                    </td>
                  </tr>
                </table>
              `).join('')}
            </td>
          </tr>
          
          <!-- Order Total -->
          <tr>
            <td style="padding: 20px 40px 30px; background-color: #FFFFFF; border-top: 1px solid #E8E4DF;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B6B6B;">Subtotal</td>
                  <td style="padding: 8px 0; text-align: right; color: #1A1A1A;">${formatPrice(data.subtotal)}</td>
                </tr>
                ${data.discount > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #4A6741;">Discount</td>
                  <td style="padding: 8px 0; text-align: right; color: #4A6741;">-${formatPrice(data.discount)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #6B6B6B;">Shipping</td>
                  <td style="padding: 8px 0; text-align: right; color: #1A1A1A;">${data.shipping === 0 ? 'Free' : formatPrice(data.shipping)}</td>
                </tr>
                <tr>
                  <td style="padding: 15px 0 0; font-size: 18px; font-weight: 600; color: #1A1A1A; border-top: 1px solid #D4C5B5;">Total</td>
                  <td style="padding: 15px 0 0; text-align: right; font-size: 18px; font-weight: 600; color: #1A1A1A; border-top: 1px solid #D4C5B5;">${formatPrice(data.total)}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Shipping Address -->
          <tr>
            <td style="padding: 30px 40px; background-color: #F5F2EF;">
              <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 400; color: #1A1A1A;">
                Shipping Address
              </h3>
              <p style="margin: 0; font-size: 15px; color: #4A4A4A; line-height: 1.7;">
                ${data.shippingAddress.fullName}<br>
                ${data.shippingAddress.address1}<br>
                ${data.shippingAddress.address2 ? `${data.shippingAddress.address2}<br>` : ''}
                ${data.shippingAddress.city}, ${data.shippingAddress.state} - ${data.shippingAddress.pincode}
              </p>
            </td>
          </tr>
          
          <!-- Delivery Timeline -->
          <tr>
            <td style="padding: 30px 40px; background-color: #FFFFFF;">
              <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 400; color: #1A1A1A;">
                Estimated Delivery
              </h3>
              <p style="margin: 0; font-size: 16px; color: #8B7355;">
                ${data.estimatedDelivery}
              </p>
              ${data.trackingNumber ? `
              <p style="margin: 15px 0 0; font-size: 14px; color: #6B6B6B;">
                Tracking Number: <strong style="color: #1A1A1A;">${data.trackingNumber}</strong>
              </p>
              ${data.trackingUrl ? `
              <p style="margin: 10px 0 0;">
                <a href="${data.trackingUrl}" style="color: #8B7355; text-decoration: underline;">Track Your Order</a>
              </p>
              ` : ''}
              ` : `
              <p style="margin: 15px 0 0; font-size: 14px; color: #6B6B6B; font-style: italic;">
                You will receive tracking information once your order ships.
              </p>
              `}
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #FFFFFF;">
              <a href="https://ardori.com/shop" style="display: inline-block; padding: 16px 40px; background-color: #1A1A1A; color: #FAF8F5; text-decoration: none; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-family: 'Arial', sans-serif;">
                Continue Shopping
              </a>
            </td>
          </tr>
          
          <!-- Customer Care -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #F5F2EF; border-top: 1px solid #E8E4DF;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #6B6B6B;">
                Questions about your order?
              </p>
              <a href="mailto:ardori.work@gmail.com" style="color: #8B7355; text-decoration: none; font-size: 14px;">
                ardori.work@gmail.com
              </a>
            </td>
          </tr>
          
          <!-- Social Links -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #1A1A1A;">
              <p style="margin: 0 0 15px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #9A958F; font-family: 'Arial', sans-serif;">
                Follow Us
              </p>
              <a href="https://instagram.com/ardori" style="color: #FAF8F5; text-decoration: none; margin: 0 10px; font-size: 14px;">Instagram</a>
              <span style="color: #4A4540;">|</span>
              <a href="https://facebook.com/ardori" style="color: #FAF8F5; text-decoration: none; margin: 0 10px; font-size: 14px;">Facebook</a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #1A1A1A;">
              <p style="margin: 0; font-size: 11px; color: #5A5550; font-family: 'Arial', sans-serif;">
                © 2025 Ardori India. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export default generateOrderConfirmationEmail;
