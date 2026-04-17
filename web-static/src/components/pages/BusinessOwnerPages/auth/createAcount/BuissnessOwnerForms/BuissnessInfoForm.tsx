import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import TextInput from '../../sharedFormComponents/TextInput';
import SelectInput from '../../sharedFormComponents/Selectinput';
import { motion } from 'framer-motion';

type BusinessInfoFormData = {
  businessName: string;
  service: string;
  address: string;
  country: string;
};

const schema = yup.object({
  businessName: yup.string().required('Business name is required').min(2, 'Must be at least 2 characters'),
  service: yup.string().required('Service is required').min(2, 'Must be at least 2 characters'),
  address: yup.string().required('Address is required').min(5, 'Must be at least 5 characters'),
  country: yup.string().required('Country is required').oneOf(['Ghana', 'Nigeria'], 'Please select a valid country'),
});

const countryOptions = [
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Nigeria', label: 'Nigeria' },
];

const BusinessInfoForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<BusinessInfoFormData>({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const onSubmit = (data: BusinessInfoFormData) => {
    updateFormData(data);
    navigate('/set-profile');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-10 gap-1 sm:gap-2"
      >
        <p className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-100">
          Business Information
        </p>
        <p className="text-[#82826A] dark:text-gray-400 font-medium text-xs sm:text-sm">
          Step 2 of 3
        </p>
      </motion.div>

      {/* Business Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <TextInput
          id="businessName"
          label="Business Name"
          register={register}
          error={errors.businessName}
          placeholder="Xyz company"
        />
      </motion.div>

      {/* Service */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <TextInput
          id="service"
          label="Service"
          register={register}
          error={errors.service}
          placeholder="Parcel delivery"
        />
      </motion.div>

      {/* Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <TextInput
          id="address"
          label="Address"
          register={register}
          error={errors.address}
          placeholder="123 Track road, Lagos"
        />
      </motion.div>

      {/* Country */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <SelectInput
          id="country"
          label="Country"
          register={register}
          error={errors.country}
          options={countryOptions}
        />
      </motion.div>

      {/* Submit */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-primary dark:bg-orange-500 dark:hover:bg-orange-400
          dark:shadow-[0_0_12px_rgba(249,115,22,0.3)] text-white py-2.5 px-4
          rounded-md text-sm sm:text-base font-medium transition-all duration-200"
      >
        Continue
      </motion.button>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-6 pb-16 sm:pb-20 text-sm sm:text-base text-gray-700 dark:text-gray-300"
      >
        Already have an account?{' '}
        <Link to="/Login" className="text-primary dark:text-orange-400 hover:underline">
          Sign in
        </Link>
      </motion.div>
    </motion.form>
  );
};

export default BusinessInfoForm;