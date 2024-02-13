/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import { Chip, Stack } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ExpenseCard({
  id,
  name,
  members = [],
  setOpen,
  setViewExpenseModal,
}) {
  return (
    <Card
      sx={{
        minWidth: 275,
        border: '1px solid gray',
        borderRadius: '1rem',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {name}
        </Typography>
        <Stack direction='row' spacing={2} sx={{ flexWrap: 'wrap' }}>
          {members.map((member) => {
            return <Chip key={member} label={member} variant='outlined' />;
          })}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          variant='contained'
          onClick={() => {
            setOpen(true);
            localStorage.setItem('SELECTED_EXPENSE', id);
          }}
        >
          Add Expense
        </Button>
        <Button
          size='small'
          variant='contained'
          onClick={() => setViewExpenseModal(true)}
        >
          View Expenses
        </Button>
      </CardActions>
    </Card>
  );
}
