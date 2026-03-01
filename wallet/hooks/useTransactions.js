import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';


const useTransactions = (userID) => {
 const [transactions, setTransactions] = useState([]);
 const [summary, setSummary] = useState({income: 0, expense: 0, balance: 0});
 const [isLoading, setIsLoading] = useState(true);
 const API_URL = 'http://192.168.0.152:3000/api';
 



 const fetchTransactions = useCallback(async () => {
    try {
        const response = await fetch(`${API_URL}/transactions/${userID}`);
        const data = await response.json();
        setTransactions(data);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }

 }, [userID])


 const getSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userID}`);
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error('Error fetching summary:', error);
        } 
    }, [userID])

    const loadData = useCallback(async () => {
        if (!userID) return;    
        setIsLoading(true);
        try {
        await Promise.all([fetchTransactions(), getSummary()]);
        // await fetchTransactions();
        // await getSummary();
        } catch (error) {
        console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
        
    }, [ getSummary, userID])

    const deleteTransaction = useCallback(async (transactionID) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${transactionID}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }
            
            loadData();
            Alert.alert('Success', 'Transaction deleted successfully');
        } catch (error) {
            console.error('Error deleting transaction:', error);
            Alert.alert('Error', 'Failed to delete transaction');
        }
    }, []);

    return { summary, loadData, transactions, isLoading, deleteTransaction};


}

export default useTransactions;