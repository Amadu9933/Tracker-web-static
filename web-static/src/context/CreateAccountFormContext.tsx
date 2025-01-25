import React, { createContext, useContext, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  businessName: string;
  service: string;
  address: string;
  accountType: string;
  profileImage: File | null;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  businessName: '',
  service: '',
  address: '',
  profileImage: null,
  accountType: 'business',
};

type FormContextType = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
