import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../pages/BusinessOwnerPages/auth/sharedFormComponents/TextInput'; // adjust path as needed
import ServerError from '../pages/ErrorPages/ServerError'; // adjust path as needed
type NeedHelpFormData = {
  question: string;
};

const NeedHelp: React.FC = () => {
  const { register, formState: { errors } } = useForm<NeedHelpFormData>();

  return (
    <div className="">
      <TextInput
        id="question"
        label="How can we help you?"
        register={register}
        error={errors.question}
      />

      <ServerError />

    </div>
  );
};

export default NeedHelp;