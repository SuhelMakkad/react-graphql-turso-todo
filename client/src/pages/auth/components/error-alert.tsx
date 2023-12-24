import { AlertCircleIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const ErrorAlert = () => {
  const [searchParams] = useSearchParams();

  const error = searchParams.get("error");
  const errorMessage = error ? decodeURIComponent(error) : "";

  return (
    !!errorMessage && (
      <div className="flex items-center gap-2 rounded-lg border border-destructive p-4 text-sm text-destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <p className="">{errorMessage}</p>
      </div>
    )
  );
};

export default ErrorAlert;
