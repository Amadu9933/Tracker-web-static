import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const ServerError = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background-light to-white dark:from-background-dark dark:to-gray-900 flex items-center justify-center px-4">
            <div className="text-center max-w-md">

                {/* Error Code */}
                <div className="mb-4">
                    <h1 className="text-9xl font-bold text-primary">500</h1>
                </div>

                {/* Title & Message */}
                <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                    Internal Server Error
                </h2>
                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
                    Something went wrong on our end. We are working to fix it.
                    Please try again in a few moments.
                </p>



                {/* Action Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                        sx={{
                            backgroundColor: '#FF833C',
                            '&:hover': { backgroundColor: '#E67A33' },
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            padding: '10px 32px',
                        }}
                    >
                        Retry
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
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
                        Go Home
                    </Button>
                </div>

                <div className="mt-10 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    If this keeps happening, please contact support.
                </div>
            </div>
        </div>
    );
};

export default ServerError;