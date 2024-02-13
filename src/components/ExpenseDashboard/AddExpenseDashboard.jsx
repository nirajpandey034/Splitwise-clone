/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { startSplitting } from '../../util/SplitExpense';

export default function AddExpenseDashboard({ setOpen }) {
  const [members, setMembers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [expenseDetail, setExpenseDetail] = useState('');
  const [owner, setOwner] = useState('');
  const [recievers, setRecievers] = useState([]);
  const [exempts, setExempts] = useState([]);
  const handleRecieverSelection = (member, status) => {
    if (status) {
      setRecievers([...recievers, member]);
    } else {
      setRecievers(recievers.filter((item) => item !== member));
    }
  };

  const splitExpense = ({ members, amount, owner, exempts }) => {
    const { expenseGroup, transactionHistory } = startSplitting({
      members,
      amount,
      owner,
      exempts,
      expenseDetail,
    });
    const finalExpenseGroup = JSON.parse(
      localStorage.getItem('EXPENSE_GROUPS')
    );
    const currentExpenseId = localStorage.getItem('SELECTED_EXPENSE');
    delete expenseGroup.name;
    delete expenseGroup.members;

    finalExpenseGroup[currentExpenseId] = {
      ...finalExpenseGroup[currentExpenseId],
      ledger: { ...expenseGroup },
    };
    localStorage.setItem('EXPENSE_GROUPS', JSON.stringify(finalExpenseGroup));
    console.log('History', transactionHistory);
    setOpen(false);
  };
  useEffect(() => {
    const currentGroup = localStorage.getItem('SELECTED_EXPENSE');
    const expenseGroups = JSON.parse(localStorage.getItem('EXPENSE_GROUPS'));
    const currentExpense = Object.keys(expenseGroups).filter(
      (grp) => grp === currentGroup
    );

    setMembers(expenseGroups[currentExpense].members);
  }, []);
  useEffect(() => {
    if (members.length > 0 && owner.length > 0) {
      const allRecvrs = [
        ...new Set([...members.filter((item) => item !== owner)]),
        ...recievers,
      ];
      const exempts = allRecvrs.map((rcvrs) => {
        if (!recievers.includes(rcvrs)) return rcvrs;
      });
      setExempts(
        exempts.filter((item) => {
          if (item) return item;
        })
      );
    }
  }, [members, recievers, owner]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          label='What for?'
          value={expenseDetail}
          onChange={(e) => {
            setExpenseDetail(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Amount to split'
          amount={amount}
          type='number'
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id='expense-owner'>Owner</InputLabel>
          <Select
            id='owner-select'
            value={owner}
            label='Age'
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          >
            {members.length > 0 &&
              members.map((member, index) => (
                <MenuItem key={index} value={member}>
                  {member}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      {owner.length > 0 && (
        <>
          <Grid item xs={12}>
            <Typography fontWeight='bold' variant='p'>
              Split with:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              {members.length > 0 &&
                members
                  .filter((item) => item !== owner)
                  .map((member, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          onChange={(e) => {
                            handleRecieverSelection(member, e.target.checked);
                          }}
                        />
                      }
                      label={member}
                    />
                  ))}
            </FormGroup>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Button
          sx={{ textTransform: 'unset' }}
          variant='contained'
          onClick={() => splitExpense({ members, amount, owner, exempts })}
        >
          Split
        </Button>
      </Grid>
    </Grid>
  );
}
