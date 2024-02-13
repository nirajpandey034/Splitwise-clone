import { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import CreateExpenseGroupModal from '../ExpenseDashboard/CreateExpenseGroupModal';
import AddExpenseModal from '../ExpenseDashboard/AddExpenseModal';
import ExpenseCard from '../ExpenseDashboard/ExpenseCard';
import ViewExpenseModal from '../ExpenseDashboard/ViewExpenseModal';

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [openAddExpenseModal, setAddExpenseModal] = useState(false);
  const [openViewExpenseModal, setViewExpenseModal] = useState(false);
  const [expenseGroups, setExpenseGroups] = useState({});
  const [updateList, setUpdateList] = useState(false);
  useEffect(() => {
    function checkUserData() {
      const item = JSON.parse(localStorage.getItem('EXPENSE_GROUPS'));
      if (item) {
        setExpenseGroups(item);
      }
    }
    checkUserData();
  }, [updateList]);
  return (
    <div>
      <Typography
        variant='h1'
        gutterBottom
        sx={{ textDecoration: 'underline' }}
      >
        Split-Wise Clone
      </Typography>
      <Button
        variant='outlined'
        sx={{ textTransform: 'unset' }}
        onClick={() => setOpenModal(!openModal)}
      >
        Split Expense
      </Button>
      <Grid container spacing={3} sx={{ mt: 2, flexWrap: 'wrap' }}>
        {Object.keys(expenseGroups).length > 0 &&
          Object.keys(expenseGroups).map((group) => (
            <Grid
              item
              xs={12}
              sx={{ maxWidth: '100%' }}
              key={expenseGroups[group].name}
            >
              <ExpenseCard
                id={group}
                name={expenseGroups[group].name}
                members={expenseGroups[group].members}
                setOpen={setAddExpenseModal}
                setViewExpenseModal={setViewExpenseModal}
              />
            </Grid>
          ))}
      </Grid>
      <CreateExpenseGroupModal
        open={openModal}
        setOpen={setOpenModal}
        updateList={updateList}
        setUpdateList={setUpdateList}
      />
      <AddExpenseModal
        open={openAddExpenseModal}
        setOpen={setAddExpenseModal}
      />
      <ViewExpenseModal
        open={openViewExpenseModal}
        setOpen={setViewExpenseModal}
      />
    </div>
  );
}
