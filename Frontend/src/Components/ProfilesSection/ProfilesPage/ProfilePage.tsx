import "@/Components/ProfilesSection/LinkButton.scss";
import { Link, useParams } from "react-router-dom";

export default function ProfilePage(theme: string) {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <h3>Profile {id}</h3>

      <Link to="/profiles" className="linkButton">
        Перейти в Профили
      </Link>

      <br />

      <Link to="/" className="linkButton">
        Перейти в Главное Меню
      </Link>
    </>
  );
}
