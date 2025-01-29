import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUsers, deleteUser } from '../../api'; // Import deleteUser API
import DataTable from 'react-data-table-component';
import Layout from '../Layout';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdViewKanban } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

const UserListing = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getAllUsers();
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

 

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id); // Call delete API
          setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // Remove from UI
          
          // Show success toaster instead of popup
          toast.error("User deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        } catch (error) {
          // Show error toaster instead of popup
          toast.error("Failed to delete user. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    });
  };
  
  

  const handleView = (id) => {
    toast.info(`View user with ID: ${id}`);
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Role', selector: row => row.role, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-2">
          <button
            className="btn btn-sm icun bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded"
            onClick={() => handleEdit(row.id)}
            title="Edit"
          >
            <FaEdit style={{ fontSize: '20px', color: 'green' }} />
          </button>
          <button
            className="btn btn-sm icun bg-red-500 hover:bg-red-700 px-2 py-1 rounded"
            onClick={() => handleDelete(row.id)}
            title="Delete"
          >
            <FaTrash style={{ fontSize: '20px', color: 'red' }} />
          </button>
          <button
            className="btn btn-sm icun bg-green-500 hover:bg-green-700 px-2 py-1 rounded"
            onClick={() => handleView(row.id)}
            title="View"
          >
            <MdViewKanban style={{ fontSize: '20px', color: '#4169E1' }} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <Layout showHeader showSidebar showNavbar showFooter>
      <div className="container mx-auto mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">User List</h2>
          <NavLink to="/create-user" className="btn btn-success">
            Add User
          </NavLink>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or role"
            className="form-control w-1/3"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <DataTable
            title="Users"
            columns={columns}
            data={filteredUsers}
            pagination
            highlightOnHover
            responsive
            customStyles={customStyles}
          />
        )}
      </div>
    </Layout>
  );
};

const customStyles = {
  rows: {
    style: {
      minHeight: '56px',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#f3f4f6',
      fontWeight: 'bold',
      fontSize: '14px',
      textTransform: 'uppercase',
      color: '#374151',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      color: '#4b5563',
    },
  },
};

export default UserListing;
