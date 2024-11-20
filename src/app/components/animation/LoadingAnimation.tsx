// components/shared/LoadingAnimation.tsx

"use client";

interface LoadingAnimationProps {
  message?: string; // Optional message to display
}

const LoadingAnimation = ({ message }: LoadingAnimationProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader"></div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
      <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #4f46e5; /* Primary color */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
