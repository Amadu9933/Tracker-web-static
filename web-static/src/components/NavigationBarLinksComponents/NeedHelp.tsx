import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../pages/BusinessOwnerPages/auth/sharedFormComponents/TextInput'; // adjust path as needed
import CongratulationsAlert from '@components/pages/BusinessOwnerPages/manageID/CongratulationsAlert';
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
      {/* Example usage of CongratulationsAlert */}
      <CongratulationsAlert trackingID="123456789" onClose={() => console.log('Modal closed')} />

    </div>
  );
};

export default NeedHelp;