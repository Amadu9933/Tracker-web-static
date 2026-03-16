import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import TextInput from '../../sharedFormComponents/TextInput';
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
        <p className="font-medium text-base sm:text-lg">Business Information</p>
        <p className="text-[#82826A] font-medium text-xs sm:text-sm">Step 2 of 3</p>
      </motion.div>

      {/* Fields */}
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

      {/* Country Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <label htmlFor="country" className="text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          id="country"
          {...register('country')}
          defaultValue=""
          className={`w-full border rounded-md px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary transition
            ${errors.country ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
        >
          <option value="" disabled>Select your country</option>
          <option value="Ghana">Ghana</option>
          <option value="Nigeria">Nigeria</option>
        </select>
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
        )}
      </motion.div>

      {/* Submit */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-primary text-white py-2.5 px-4 rounded-md text-sm sm:text-base transition"
      >
        Continue
      </motion.button>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-6 pb-16 sm:pb-20 text-sm sm:text-base"
      >
        <span>
          Already have an account?{' '}
          <Link to="/Login" className="text-primary hover:underline">
            Sign in
          </Link>
        </span>
      </motion.div>
    </motion.form>
  );
};

export default BusinessInfoForm;