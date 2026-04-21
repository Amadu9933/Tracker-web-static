import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background-light to-white dark:from-background-dark dark:to-gray-900 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Error Code */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold   text-primary dark:text-slate-200">
                        404
                    </h1>
                </div>

                {/* Message */}
                <h2 className="text-3xl font-bold text-text-secondary-light dark:text-text-primary-dark mb-4">
                    This parcel took a wrong turn!
                </h2>
                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
                    Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track!
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{
                            backgroundColor: '#FF833C',
                            '&:hover': {
                                backgroundColor: '#E67A33',
                            },
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            padding: '10px 32px',

                        }}
                    >
                        Go to Home
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{
                            borderColor: '#FF833C',
                            color: '#FF833C',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 131, 60, 0.08)',
                                borderColor: '#E67A33',
                            },
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            padding: '10px 32px',
                        }}
                    >
                        Go Back
                    </Button>
                </div>

                {/* Illustration Area */}
                <div className="mt-12 text-6xl opacity-20">

                </div>
            </div>
        </div>
    );
};

export default NotFound;
