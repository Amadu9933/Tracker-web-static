import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import TextInput from '../../sharedFormComponents/TextInput';

type BusinessInfoFormData = {
  businessName: string;
  service: string;
  address: string;
};

const schema = yup.object({
  businessName: yup
    .string()
    .required('Business name is required')
    .min(2, 'Must be at least 2 characters'),
  service: yup
    .string()
    .required('Service is required')
    .min(2, 'Must be at least 2 characters'),
  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Must be at least 5 characters'),
});

const BusinessInfoForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessInfoFormData>({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const onSubmit = (data: BusinessInfoFormData) => {
    updateFormData(data);
    navigate('/set-profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className='flex justify-between   mb-10'>
        <p className='font-medium text-lg'>Business Information</p>
        <p className='text-[#82826A]  font-medium'>Step  of 3</p>
      </div>
      <TextInput
        id="businessName"
        label="Business Name"
        register={register}
        error={errors.businessName}
        placeholder='Xyz compsny'
      />
      <TextInput
        id="service"
        label="Service"
        register={register}
        error={errors.service}
        placeholder='Parcel delivery'
      />
      <TextInput
        id="address"
        label="Address"
        register={register}
        error={errors.address}
        placeholder='123 Track road, Lagos'
      />

      <button
        type="submit"
        className="w-full  bg-primary text-white p-2 rounded-md"
      >
        Continue
      </button>
      <div className="text-center mt-8  font-[16px] pb-20 " >
        <span className="">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-primary ">
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};

export default BusinessInfoForm;
