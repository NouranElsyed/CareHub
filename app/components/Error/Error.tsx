const ErrorPage = ({ 
  title = "Something went wrong", 
  message = "Please try again later",
  showRetry = true 
}: { 
  title?: string;
  message?: string;
  showRetry?: boolean;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 w-9/10 md:w-8/10 xl:w-1/2 mx-auto  md:bg-blue-500
 lg:bg-green-500
 xl:bg-red-500">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <span className="text-3xl text-red-600">⚠️</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">{title}</h1>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && (
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:b`g-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
