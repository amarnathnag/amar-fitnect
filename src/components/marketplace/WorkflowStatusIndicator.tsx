
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Eye, Edit } from 'lucide-react';

interface WorkflowStatusIndicatorProps {
  status: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const WorkflowStatusIndicator: React.FC<WorkflowStatusIndicatorProps> = ({ 
  status, 
  showIcon = true, 
  size = 'sm' 
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          color: 'bg-gray-100 text-gray-800',
          icon: <Edit className="h-3 w-3" />
        };
      case 'pending_review':
        return {
          label: 'Pending Review',
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-3 w-3" />
        };
      case 'approved':
        return {
          label: 'Approved',
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircle className="h-3 w-3" />
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'bg-red-100 text-red-800',
          icon: <XCircle className="h-3 w-3" />
        };
      case 'published':
        return {
          label: 'Published',
          color: 'bg-green-100 text-green-800',
          icon: <Eye className="h-3 w-3" />
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
          icon: <Edit className="h-3 w-3" />
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge className={`${config.color} ${sizeClasses[size]} flex items-center gap-1`}>
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
};

export default WorkflowStatusIndicator;
