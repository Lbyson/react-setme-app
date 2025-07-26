import "@/Components/ProfilesSection/LinkButton.scss";
import {useState} from "react";
import {Link} from "react-router-dom";
import Button from "@/hooks/Button/Button.js";
import ModalWindow
  from "@/Components/ProfilesSection/ModalWindow/ModalWindow.js";

function ProfilesSection(theme: string) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <section>
      <Button onClick={() => setModalIsOpen(true)}>
        Открыть окно с доп инфой
      </Button>

      <ModalWindow isOpen={modalIsOpen}>
        <h3>Hello frodfss</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque
          deleniti distinctio eaque esse laudantium maiores minima nemo non,
          omnis perferendis possimus provident quidem quod ratione tenetur, ut.
          Consequuntur, minus!
        </p>
        <Button isActive onClick={() => setModalIsOpen(false)}>
          Close this Shit
        </Button>
      </ModalWindow>

      <br />

      <Link to="/profiles" className="linkButton">
        Перейти в Профили
      </Link>
    </section>
  );
}

export default ProfilesSection;
