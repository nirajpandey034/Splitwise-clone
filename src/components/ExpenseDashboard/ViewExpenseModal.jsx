/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ViewExpenseDashboard from './ViewExpenseDashboard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ViewExpenseModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='view-expense-modal'
        sx={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <ViewExpenseDashboard />
        </Box>
      </Modal>
    </div>
  );
}
