import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUserName } from "../../redux/auth/selectors";
import { persistor } from "../../redux/store";

const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        persistor.purge(); // ⬅️ очищаємо localStorage
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <div>
      <span>Welcome, {name}</span>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
