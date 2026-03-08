const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const Order = require("../models/order.model");
const product = require("../models/product.model");

exports.createPayment = async (req, res) => {
  try {
    const { productId, amount } = req.body;
    const order = await Order.create({
      user: req.user.id,
      product: productId,
      amount,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Product Purchase",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// webhook controller to handle Stripe events

exports.webhook = async (req, res) => {
  console.log("Webhook received");

  const sig = req.headers["stripe-signature"];
  console.log("Stripe signature:", sig);
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log("Webhook verification failed:", err.message);

    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Event type:", event.type);

  let orderId;
  let order;
if (event.type === "checkout.session.completed") 
	{
  		  const session = event.data.object;
  	 	orderId = session.metadata.orderId;
		order = await Order.findByIdAndUpdate(orderId, {
     		 status: "paid",
		    });
		console.log("orderId=",orderId, "productId=", order.product)
		if (order && order.product) 
			{
  // 3. Update the Product Stock using $inc
  // $inc: { stock: -1 } decreases the value by 1
 		 await Product.findByIdAndUpdate(order.product, 
			{
   			 $inc: { stock: -1 }
  			});
		console.log("stock updated");
  		}
	}

  res.json({ orderId, received: true });
};
