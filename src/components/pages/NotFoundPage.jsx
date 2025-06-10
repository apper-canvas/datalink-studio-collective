import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmptyState from '@/components/molecules/EmptyState';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <EmptyState
          iconName="AlertTriangle"
          className="text-warning"
          title="404"
          message="The page you're looking for doesn't exist or has been moved."
          buttonText="Go to Dashboard"
          onButtonClick={() => navigate('/')}
        />
      </motion.div>
    </div>
  );
}

export default NotFoundPage;