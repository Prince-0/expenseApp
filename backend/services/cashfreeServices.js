const axios = require('axios');

exports.createOrder = async (
  orderId,
  orderAmount,
  orderCurrency,
  customerID,
  customerPhone,
  customerEmail
) => {
try{
  const response = await axios.post(
    'https://sandbox.cashfree.com/pg/orders',
    {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: orderCurrency,
      customer_details: {
        customer_id: customerID.toString(),
        customer_email: customerEmail,
        customer_phone: customerPhone.toString()
      }
    },
    {
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'x-api-version': '2022-09-01',
        'Content-Type': 'application/json'
      }
    }
  );
    return response.data.payment_session_id;
}
    catch(error){
        console.error("❌ FULL ERROR:", error.response?.data); 
        throw error;
    }
  
};

exports.getPaymentStatus = async (orderId) => {
  const response = await axios.get(
    `https://sandbox.cashfree.com/pg/orders/${orderId}`,
    {
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'x-api-version': '2022-09-01'
      }
    }
  );

  return response.data.order_status; 
};