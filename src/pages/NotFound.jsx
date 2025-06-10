import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ApperIcon name="AlertTriangle" className="w-16 h-16 text-warning mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-surface-900 mb-4">404</h1>
          <h2 className="text-xl font-medium text-surface-700 mb-4">Page Not Found</h2>
          <p className="text-surface-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-110 transition-all"
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;