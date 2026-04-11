import * as service from '../services/Donation.service.js';
import axios from "axios";


export const initiateDonation = async (req, res) => {
  try {
    const { name, email, amount, phone, address } = req.body;

    // Save donor + Donation details to DB here (optional, but recommended)
    const donor = await service.createDonor({ name, email, phone, address });

    const donation = await service.createDonation({
      donor_id: donor.id,
      amount,
      status: "PENDING"
    });

    //Paystack Initialization
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack uses kobo
        callback_url: `${process.env.BASE_URL}/donation/verify`,
        metadata: {
          name,
          phone,
          address,
          donor_id: donor.id,
          donation_id: donation.id
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Redirect user to Paystack checkout page
    res.status(200).json({ redirectTo: response.data.data.authorization_url, message: "Redirecting to payment gateway...", success: true });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Payment initialization failed", success: false });
  }
};



export const donationForm = (req, res) => {
  try {
    res.render('donation_form');
  } catch (error) {
    console.error('Error rendering donation form:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const verifyDonation = async (req, res) => {
  const { reference } = req.query;

  try {
    const verify = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    if (verify.data.data.status === "success") {
      const donationId = verify.data.data.metadata.donation_id;
      await service.updateDonation(donationId, {
        status: "COMPLETED",
        reference,
        payment_method: verify.data.data.channel
      });
      // Save donation to DB here
      return res.json({ message: "donation_success", success: true });
    }

    res.json({ message: "Payment not successful", success: false });

  } catch (error) {
    res.status(500).json({ message: "Verification failed", success: false });
  }
};