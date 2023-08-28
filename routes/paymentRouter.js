const { Router } = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const paymentRouter = Router();

paymentRouter.post("/checkout", async (req, res) => {
  try {
    if(!req.isAuth) throw new Error("Unauthenticated")
    const data = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: req.body.name,
              description: req.body.space,
            },
            unit_amount: req.body.price*100,
          },
          quantity: "1",
        },
      ],
      metadata: {
        "roomId": req.body.roomId,
        "userId": req.userId,
        startDate:req.body.startDate,
        endDate: req.body.endDate

      },
      mode: "payment",
      success_url: `http://localhost:3000/payment?success=true`,
      cancel_url: `http://localhost:3000/payment?canceled=true`,
    });
    console.log(data);
    res.send(data);
  } catch (error) {
      console.log(error);
      res.send({err: error.message})
  }
});

paymentRouter.get("/session/:id", async(req,res) => {
  try {
    const data = await stripe.checkout.sessions.retrieve(req.params.id);
    res.send(data);
  } catch (error) {
    res.send({err: error.message})
  }
})
paymentRouter.get("/paymentIntent/:id", async(req,res) => {
  try {
    const data = await stripe.paymentIntents.retrieve(req.params.id);
    res.send(data);
  } catch (error) {
    res.send({err: error.message})
  }
})

module.exports = paymentRouter;