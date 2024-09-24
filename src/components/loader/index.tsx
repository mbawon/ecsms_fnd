import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TopLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startLoading = () => {
            setLoading(true);
            setProgress(20);
        };

        const finishLoading = () => {
            setProgress(100);
            setTimeout(() => {
                setLoading(false);
                setProgress(0);
            }, 500);
        };

        startLoading();
        finishLoading();

        return () => {
            finishLoading();
        };
    }, [location.pathname]);

    return (
        loading && (
            <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
                <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        )
    );
};

export default TopLoader;