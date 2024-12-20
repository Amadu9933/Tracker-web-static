import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';

const SetProfileImagePage: React.FC = () => {
    const { updateFormData } = useFormContext();
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            updateFormData({ profileImage: file });
        }
    };

    const handleSubmit = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
            <button onClick={handleSubmit} className="w-full bg-primary text-white p-2 rounded-md">Complete Sign Up</button>
        </div>
    );
};

export default SetProfileImagePage;
