import db from '../../../models/index.cjs';

const { Donation, Donor } = db;

//create a new donor
export const createDonor = async (donorData) => {
  try {
    const donor = await Donor.create(donorData);
    return donor;
  } catch (error) {
    console.error('Error creating donor:', error);
    throw error;
  }
};

//create a new donation
export const createDonation = async (donationData) => {
  try {
    const donation = await Donation.create(donationData);
    return donation;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

//update donation status, reference and payment method
export const updateDonation = async (donationId, updateData) => {
  try {
    const donation = await Donation.findByPk(donationId);
    if (!donation) {
      throw new Error('Donation not found');
    }
    await donation.update(updateData);
    return donation;
  } catch (error) {
    console.error('Error updating donation:', error);
    throw error;
  }
};
