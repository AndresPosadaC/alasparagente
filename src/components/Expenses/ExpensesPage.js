// ExpensesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import Expenses from './Expenses';
import NewExpense from '../NewExpense/NewExpense';
import useFetchData from '../../hooks/useFetchData';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  // Use the useFetchData hook to fetch data for expenses and movements
  const { data: expenseData, loading, refreshData: refreshExpense } = useFetchData("medinvima_json");

  // Define callback functions to set data
  const setExpensesData = useCallback(() => {
    setExpenses(expenseData);
  }, [expenseData]);
  
  useEffect(() => {
    // When expenseData changes, update the expenses state
    setExpensesData();
  }, [setExpensesData, expenseData]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
    refreshExpense();
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //useEffect(() => {
    // Fetch data for expenses
  //  fetchMedicineExpenses();
  //}, [fetchMedicineExpenses]);

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};


export default ExpensesPage;
