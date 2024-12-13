import { User } from "@/types/api";
import React from "react";
import styles from "../page.module.scss";

interface UserTableProps {
  users: User[];
  onCheckboxChange: (userId: number, walletDisplayable: boolean) => void;
  onViewInvestments: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onCheckboxChange, onViewInvestments }) => {
  return (
    <table className={styles.user_table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre y Apellido</th>
          <th>Email</th>
          <th>Rol</th>
          <th>CUIT</th>
          <th>¿Puede ver wallet?</th>
          <th>Inversiones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{`${user.name} ${user.lastName}`}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.cuit}</td>
            <td>
              <input
                type="checkbox"
                checked={user.walletDisplayable}
                onChange={() => onCheckboxChange(user.id, !user.walletDisplayable)}
              />
            </td>
            <td>
              <button onClick={() => onViewInvestments(user.id)}>Ver Inversiones</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
