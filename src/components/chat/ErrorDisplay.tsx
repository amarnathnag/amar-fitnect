
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  errorMessage: string | null;
  retryConfigConnection: () => void;
}

const ErrorDisplay = ({ errorMessage, retryConfigConnection }: ErrorDisplayProps) => {
  if (!errorMessage) return null;
  
  return (
    <Alert variant="destructive" className="m-2">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Configuration Error</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{errorMessage}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={retryConfigConnection} 
          className="ml-2"
        >
          <RefreshCcw className="h-4 w-4 mr-1" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
