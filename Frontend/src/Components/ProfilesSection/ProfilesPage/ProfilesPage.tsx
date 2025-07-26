import "@/Components/ProfilesSection/LinkButton.scss";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import useInput from "@/hooks/useInput.js";

interface User {
  id: string;
  name: string;
}

export default function ProfilesPage(theme: string) {
  const input = useInput();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const usersData = (await response.json()) as User[];

      setUsers(usersData);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers().catch((err) => {
      console.error("Ошибка при загрузке:", err);
    });
  }, [fetchUsers]);

  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <input type="text" {...input} />

          <ul>
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(input.value.toLowerCase()),
              )
              .map((user) => (
                <li key={user.id}>
                  <NavLink to={`/profiles/${user.id}`}>{user.name}</NavLink>
                </li>
              ))}
          </ul>
        </>
      )}

      <Link to="/" className="linkButton">
        Перейти в Главное Меню
      </Link>

      <Outlet />
    </>
  );
}
