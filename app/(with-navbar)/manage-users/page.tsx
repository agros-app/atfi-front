"use client";
import React, { useState, useEffect } from 'react';
import { displayWallet, getUserInvestmentsAdmin, getUsers } from '@/lib/api';
import UserTable from './components/userTable';
import Pagination from './components/pagination';
import SearchBar from './components/searchBar';
import { User, UserInvestment } from '@/types/api';
import styles from "./page.module.scss";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [investments, setInvestments] = useState<UserInvestment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
        setUsers(await getUsers(searchTerm, page, limit))
    }
    fetchUsers();
  }, [searchTerm, page]);


  const handleCheckboxChange = async (userId: number, walletDisplayable: boolean) => {
    try {
      await displayWallet(userId, walletDisplayable);    
      const newUsers = users.map((user) =>
        user.id === userId ? { ...user, walletDisplayable } : user
      );
  
      setUsers(newUsers);
    } catch (error) {
      console.error('Error updating wallet display status:', error);
    }
  };

  const handleViewInvestments = async (userId: number) => {
    try {
      const userInvestments = await getUserInvestmentsAdmin(userId);
      setInvestments(userInvestments);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching user investments:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.admin_users}>
      <h1>Usuarios Registrados</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <UserTable users={users} onCheckboxChange={handleCheckboxChange} onViewInvestments={handleViewInvestments} />
      )}
      <Pagination page={page} setPage={setPage} />

      {isModalOpen && (
        <div className={styles.modal}>
        <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeModal}>×</button>
            {investments.length === 0 ? (
                <p>El usuario no tiene inversiones</p>
            ) : (
            <table className={styles.user_table}>
            <thead>
            <tr>
              <th>Proyecto</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
            </thead>
            <tbody>
            {investments.map((investment) => (
              <tr key={investment.projectId}>
                <td>{investment.projectName}</td>
                <td>{investment.amount}</td>
                <td>{investment.status}</td>
                <td>{new Date(investment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        </div>
    </div>
    )}
    </div>
  );
};


export default AdminUsers;
