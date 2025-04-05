
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { notifyLanguageChange, translateText } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  const handleLanguageChange = (newLanguage: 'english' | 'hindi' | 'bengali') => {
    setLanguage(newLanguage);
    notifyLanguageChange(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          {!isMobile && <span>{translateText("language", language)}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('english')}
          className={language === 'english' ? 'bg-primary/10 font-medium' : ''}
        >
          {translateText("english", language)}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('hindi')}
          className={language === 'hindi' ? 'bg-primary/10 font-medium' : ''}
        >
          {translateText("hindi", language)}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('bengali')}
          className={language === 'bengali' ? 'bg-primary/10 font-medium' : ''}
        >
          {translateText("bengali", language)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
