import { motion } from "framer-motion";

function ErrorModal({ msg, type }) {
  return (
    <motion.div
      className='alert'
      key='modal'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <span className={`alert-text alert--${type}`}>{msg}</span>
    </motion.div>
  );
}
export default ErrorModal;
