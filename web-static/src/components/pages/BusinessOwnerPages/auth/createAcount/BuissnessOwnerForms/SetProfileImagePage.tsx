import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import axiosInstance from '../../../../../../api/axiosInstance';

const SetProfileImagePage: React.FC = () => {
    const { formData } = useFormContext();
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type (ensure it's an image)
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                return;
            }
            // Optionally, you can add file size validation
            // if (file.size > MAX_SIZE) {
            //     setError('File is too large. Please select a smaller image.');
            //     return;
            // }
            setImage(file);
            setError(null); // Clear any previous errors
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Prepare form data for submission
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('email', formData.email);
            payload.append('phone_number', formData.phone);
            payload.append('password', formData.password);
            payload.append('business_name', formData.businessName);
            payload.append('service', formData.service);
            payload.append('address', formData.address);
            payload.append('account_type', 'business');

            if (image) {
                payload.append('avatar', image); // Attach profile image
            }

            // Send data to backend (no need to manually set Content-Type for FormData)
            const response = await axiosInstance.post('/', payload);

            console.log('Account created successfully:', response.data);

            // Navigate to dashboard or success page
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Failed to create account:', err);
            // If the error has a response, display the error message from the server
            if (err.response && err.response.data) {
                setError('Error: ' + JSON.stringify(err.response.data)); // Display server error
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Set Profile Image</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
            />
            {image && <img src={URL.createObjectURL(image)} alt="Preview" className="my-4 w-32 h-32 object-cover rounded-full" />}
            <button
                onClick={handleSubmit}
                className={`w-full bg-primary text-white p-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Complete Sign Up'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default SetProfileImagePage;
