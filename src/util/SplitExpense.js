let expenseGroup = {};
const transactionHistory = {};

const initiateGroup = (members = []) => {
  members.map((member) => {
    expenseGroup[member] = {};
    const recievers = members.filter((mem) => mem !== member);
    recievers.map((mem) => {
      expenseGroup[member][mem] = { give: 0, take: 0 };
    });
  });
};

const updateOwner = (owner, amount = 0, exempts = []) => {
  const expenseOwner = expenseGroup[owner];
  Object.keys(expenseOwner || {}).map((member) => {
    // if user is not in exempt list
    if (exempts.includes(member) === false) {
      expenseOwner[member].take += amount;
    }
  });
  expenseGroup[owner] = expenseOwner;
};

const updateRecievers = (owner, recievers, amount) => {
  recievers.map((member) => {
    expenseGroup[member][owner].give += amount;
  });
};

const syncTransactions = (members) => {
  members.map((member) => {
    Object.keys(expenseGroup[member]).map((mem) => {
      if (expenseGroup[member][mem].give > expenseGroup[member][mem].take) {
        expenseGroup[member][mem].give -= expenseGroup[member][mem].take;
        expenseGroup[member][mem].take = 0;
      } else if (
        expenseGroup[member][mem].take > expenseGroup[member][mem].give
      ) {
        expenseGroup[member][mem].take -= expenseGroup[member][mem].give;
        expenseGroup[member][mem].give = 0;
      } else {
        expenseGroup[member][mem].give = 0;
        expenseGroup[member][mem].take = 0;
      }
    });
  });
};

const generateUniqueTransactionId = () => {
  return Math.random().toString(36).substr(2);
};

const addTransactionToHistory = (
  owner,
  recievers,
  amount,
  exempts,
  expenseDetail
) => {
  const transactionId = generateUniqueTransactionId();
  transactionHistory[owner] = transactionHistory[owner]
    ? transactionHistory[owner]
    : {};
  transactionHistory[owner][transactionId] = {
    sender: owner,
    recievers: recievers,
    amount: amount,
    exemptedMembers: exempts,
    detail: expenseDetail,
    date:
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear() +
      ' ' +
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds(),
  };
  return transactionId;
};
const addExpense = ({
  members,
  owner,
  amount = 0,
  exempts = [],
  expenseDetail,
}) => {
  const amountPerHead = amount / (members.length - exempts.length);

  const recievers = members
    .filter((member) => member !== owner)
    .filter((member) => exempts.includes(member) === false);
  updateOwner(owner, amountPerHead, exempts);
  updateRecievers(owner, recievers, amountPerHead);
  syncTransactions(members);

  return addTransactionToHistory(
    owner,
    recievers,
    amount,
    exempts,
    expenseDetail
  );
};

export const startSplitting = ({
  members,
  amount,
  owner,
  exempts,
  expenseDetail,
}) => {
  const expenseGrp = JSON.parse(localStorage.getItem('EXPENSE_GROUPS'));
  const expenseId = localStorage.getItem('SELECTED_EXPENSE');

  const currentExpense = expenseGrp[expenseId].ledger
    ? expenseGrp[expenseId].ledger
    : {};
  expenseGroup = currentExpense;

  if (Object.keys(expenseGroup || {}).length < 1) initiateGroup(members);

  addExpense({ owner, amount, exempts, members, expenseDetail });

  return { expenseGroup, transactionHistory };
};
