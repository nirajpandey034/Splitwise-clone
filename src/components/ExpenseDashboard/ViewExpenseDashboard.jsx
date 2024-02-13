import { useEffect, useState } from 'react';
import CustomAccordion from '../../shared/CustomAccordion';
import ExpenseBorrowersAccordion from './ExpenseBorrowersAccordion';

export default function ViewExpenseDashboard() {
  const [members, setMembers] = useState([]);
  const [expenseGroup, setExpenseGroup] = useState({});
  useEffect(() => {
    const expenseGroup = JSON.parse(localStorage.getItem('EXPENSE_GROUPS'));
    const currentExpense = localStorage.getItem('SELECTED_EXPENSE');

    const currentExpenseGroup = expenseGroup[currentExpense];
    setExpenseGroup(
      currentExpenseGroup.ledger ? currentExpenseGroup.ledger : {}
    );
    setMembers(currentExpenseGroup.members);
  }, []);

  return (
    <div>
      {Object.keys(expenseGroup).length > 0 &&
        members.length > 0 &&
        members.map((item) => {
          return (
            <CustomAccordion
              key={item}
              title={item}
              child={Object.keys(expenseGroup[item]).map((borrower) => (
                <ExpenseBorrowersAccordion
                  key={borrower}
                  member={borrower}
                  details={expenseGroup[item][borrower]}
                />
              ))}
            />
          );
        })}
      {Object.keys(expenseGroup).length === 0 && (
        <p>Nothing Available. Add Some Expense</p>
      )}
    </div>
  );
}
