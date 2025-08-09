
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there is history, go back; otherwise go home
    if (window.history.state && (window.history.state as any).idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Go back"
      onClick={handleBack}
      className="hover-scale"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
