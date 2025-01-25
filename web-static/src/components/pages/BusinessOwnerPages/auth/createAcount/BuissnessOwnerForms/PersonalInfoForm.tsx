import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import TextInput from '../../sharedFormComponents/TextInput';

type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const PersonalInfoForm: React.FC = () => {
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updateFormData(data); // Save name and other details in context
    navigate('/business-info'); // Navigate to the next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        id="name"
        label="Name"
        register={register}
        error={errors.name}
      />
      <TextInput
        id="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email}
      />
      <TextInput
        id="phone"
        label="Phone"
        register={register}
        error={errors.phone}
      />
      <TextInput
        id="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password}
      />
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded-md"
      >
        Continue
      </button>
    </form>
  );
};

export default PersonalInfoForm;
