/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Stack, TextField, Chip, Typography } from '@mui/material';
import { generateUniqueTransactionId } from '../../util/GenerateKey';

export default function CreateExpenseGroupDashboard({
  setOpen,
  updateList,
  setUpdateList,
}) {
  const [currentMember, setCurrentMember] = useState('');
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState('');

  const addMember = () => {
    if (currentMember.length !== 0) {
      if (!members.includes(currentMember)) {
        setMembers([...members, currentMember]);
        setCurrentMember('');
      } else alert('Member already exists');
    }
  };
  const createGroup = () => {
    const groupId = generateUniqueTransactionId();
    const group = {
      ...JSON.parse(localStorage.getItem('EXPENSE_GROUPS') || '{}'),
      ...{
        [groupId]: {
          name: groupName,
          members: members,
        },
      },
    };
    localStorage.setItem('EXPENSE_GROUPS', JSON.stringify(group));
    setUpdateList(!updateList);

    setOpen(false);
  };
  return (
    <>
      <Typography variant='h6' sx={{ textAlign: 'center', mb: 4 }}>
        Create your expense group
      </Typography>
      <Stack direction='column'>
        <TextField
          label='Expense Group Name'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Stack direction='row' spacing={5} sx={{ mt: 2 }}>
          <TextField
            label='Add Member'
            value={currentMember}
            onChange={(e) => setCurrentMember(e.target.value)}
          />
          <Button variant='contained' onClick={() => addMember()}>
            Add
          </Button>
        </Stack>
        {members.length > 0 && (
          <Stack direction='row' spacing={3} sx={{ flexWrap: 'wrap', mt: 2 }}>
            {members.map((member) => {
              return <Chip key={member} label={member} variant='outlined' />;
            })}
          </Stack>
        )}
        <Button
          variant='contained'
          sx={{ mt: 2 }}
          onClick={() => createGroup()}
        >
          Create
        </Button>
      </Stack>
    </>
  );
}
