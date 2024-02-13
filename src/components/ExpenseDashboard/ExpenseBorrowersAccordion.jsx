/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import CustomAccordion from '../../shared/CustomAccordion';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ExpenseBorrowersAccordion({ member, details }) {
  const [borrowList, setBorrowList] = useState([]);
  useEffect(() => {
    setBorrowList(getCustomTransaction(member, details));
  }, []);
  return <CustomAccordion title={member} child={borrowList} />;
}

function getCustomTransaction(member, details) {
  if (details.give === 0 && details.take === 0) {
    return [];
  } else
    return [
      <p key={member}>
        {details.take !== 0 && (
          <>
            <span style={{ color: 'green' }}>
              {<ArrowDropUpIcon />} TAKE Rs. {details.take}
            </span>
            <br />
          </>
        )}
        {details.give !== 0 && (
          <>
            <span>
              <span style={{ color: 'red' }}>
                {<ArrowDropDownIcon />}GIVE Rs. {details.give}
              </span>
            </span>
          </>
        )}
      </p>,
    ];
}
