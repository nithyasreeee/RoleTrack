export default function Loader({ size = "md", text = "" }) {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizes[size]} border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin`}></div>
        
        {/* Inner pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {text && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
