/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CreateExpenseGroupDashboard from './CreateExpenseGroupDashboard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function CreateExpenseGroupModal({
  open,
  setOpen,
  updateList,
  setUpdateList,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <CreateExpenseGroupDashboard
            setOpen={setOpen}
            updateList={updateList}
            setUpdateList={setUpdateList}
          />
        </Box>
      </Modal>
    </div>
  );
}
