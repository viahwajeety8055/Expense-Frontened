// actions.js
export const ADD_EXPENSE = "ADD_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});
