import { Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GiLoad } from 'react-icons/gi';

export const ECSpinner = () => (
  <motion.div
    initial={{ scaleX: 0.5, scaleY: 0.5 }}
    animate={{ scaleX: 1.3, scaleY: 1.3 }}
    transition={{
      duration: 0.6,
      bounce: 0.5,
      type: 'spring',
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'reverse',
    }}
  >
    <Icon as={GiLoad} boxSize={20} color="primary.400" />
  </motion.div>
);
