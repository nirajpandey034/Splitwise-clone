/* eslint-disable react/prop-types */
export default function MemberExpenseDetail({ member, expense }) {
  return (
    <div>
      <p>
        <strong>
          {member} will get {expense}
        </strong>
      </p>
    </div>
  );
}
