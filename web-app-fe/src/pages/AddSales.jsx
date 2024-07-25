import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddSales = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');

  const addsale = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!productName || !quantity || !amount) {
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required.',
      });
      return;
    }

    // Convert quantity and amount to numbers
    const addData = {
      productName,
      quantity: Number(quantity),
      amount: Number(amount),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/addsale`, addData);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Sale added successfully!',
        });

        // Reset form fields
        setProductName('');
        setQuantity('');
        setAmount('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to add sale. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error adding sale:', error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">ADD SALE ENTRY</h3>
      <form onSubmit={addsale} className="shadow-sm p-3">
        <div className="mb-3">
          <label className="form-label text-muted">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(ev) => setProductName(ev.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(ev) => setQuantity(ev.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSales;
