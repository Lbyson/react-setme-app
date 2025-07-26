import "@/Components/ProfilesSection/ModalWindow/ModalWindow.scss";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";

interface ModalWindowProps {
  children: ReactNode;
  isOpen?: boolean;
}

function ModalWindow({ children, isOpen }: ModalWindowProps) {
  const linkToDialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = linkToDialog.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const modalContainer = document.getElementById("modal");
  if (!modalContainer) return null;

  return createPortal(
    <dialog ref={linkToDialog} className="dialog">
      {children}
    </dialog>,
    modalContainer,
  );
}

export default ModalWindow;
