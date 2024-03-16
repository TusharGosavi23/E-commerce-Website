// import express from 'express';
// import dotenv from 'dotenv';
// import stripe from 'stripe';
// //load variables

// dotenv.config();

// //start server
// const app = express();

// app.use(express.static('public'));
// app.use(express.json());


// //home route
// app.get('/' , (req, res) =>{
//     res.sendFile("index.html", {root:'public'});
// });

// //success
// app.get('/success' , (req, res) =>{
//     res.sendFile("success.html", {root:'public'});
// });

// //cancle
// app.get('/cancle' , (req, res) =>{
//     res.sendFile("cancle.html", {root:'public'});
// })

// //stripe 
// let stripeGateway = stripe(process.env.stripe_api);
// let DOMAIN = process.env.DOMAIN;
// app.post('/stripe-checkout', async (req, res)=>{
//         const lineItems = req.body.items.map((item) => {
//         const unitAmount = parseInt(item.price.replace(/[^0-9]+/g, " ")*100);
//         console.log('item-price:', item.price);
//         console.log('unitAmount:', unitAmount);
//         return{
//             price_data:{
//                 currency:'usd',
//                 product_data:{
//                     name:item.title,
//                     images:[item.productImg],
//                 },
//                 unit_amount:unitAmount,
//             },
//             quantity:item.quantity,
//         };
//     });
//     console.log("lineItems", lineItems);

//     //create checkout session

//     const session = await stripeGateway.checkout.session.create({
//         payment_method_types:['card'],
//         mode:'payment',
//         success_url:`${DOMAIN}/success`,
//         cancle_url:`${DOMAIN}/cancle`,
//         line_items:lineItems,
//         //asking address in stripe checkout
//         billing_address_collection:'required'
//     });
//     res.json(session.url);

// });

// app.listen(3000, () =>{
//     console.log("listening on port 3000");
// });


import express from 'express';
import dotenv from 'dotenv';
import stripePackage from 'stripe';

dotenv.config();

const app = express();
const stripe = new stripePackage(process.env.stripe_api); // Changed the variable name

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.get('/success', (req, res) => {
    res.sendFile('success.html', { root: 'public' });
});

app.get('/cancle', (req, res) => {
    res.sendFile('cancle.html', { root: 'public' });
});

let DOMAIN = process.env.DOMAIN;

// app.post('/stripe-checkout', async (req, res) => {
//     const lineItems = req.body.items.map((item) => {
//         const unitAmount = parseInt(item.price.replace(/[^0-9]+/g, ' ')*100);
//         return {
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: item.title,
//                     images: [item.productImg],
//                 },
//                 unit_amount: unitAmount,
//             },
//             quantity: item.quantity,
//         };
//     });

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         success_url: `${DOMAIN}/success`,
//         cancel_url: `${DOMAIN}/cancel`, // Corrected spelling from 'cancle' to 'cancel'
//         line_items: lineItems,
//         billing_address_collection: 'required',
//     });
//     res.json({ url: session.url }); // Sending URL in JSON object
// });

// app.post('/stripe-checkout', async (req, res) => {
//     try {
//         const lineItems = req.body.items.map((item) => {
//             // Parse the price to ensure it's a valid number
//             const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
//             const unitAmount = Math.round(price * 100); // Convert price to cents
//             if (isNaN(unitAmount) || unitAmount <= 0) {
//                 throw new Error('Invalid price');
//             }

//             return {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: item.title,
//                         images: [item.productImg],
//                     },
//                     unit_amount: unitAmount,
//                 },
//                 quantity: item.quantity,
//             };
//         });

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             success_url: `${DOMAIN}/success`,
//             cancel_url: `${DOMAIN}/cancel`,
//             line_items: lineItems,
//             billing_address_collection: 'required',
//         });
        
//         res.json({ url: session.url });
//     } catch (err) {
//         console.error('Error creating Stripe session:', err);
//         res.status(500).json({ error: 'Failed to create payment session' });
//     }
// });


app.listen(3000, () => {
    console.log('listening on port 3000');
});
