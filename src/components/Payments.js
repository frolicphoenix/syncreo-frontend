// src/components/Payments.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Payments.css';

function Payments({ userId }) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get(`/payments/${userId}`);
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, [userId]);

  return (
    <div className="payments-section">
      <h3>Payment History</h3>
      <ul>
        {payments.map((payment) => (
          <li key={payment._id}>
            <strong>Project:</strong> {payment.project.title}
            <p>Amount: ${payment.amount}</p>
            <p>Status: {payment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payments;
