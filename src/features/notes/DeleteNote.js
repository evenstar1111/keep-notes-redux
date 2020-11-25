import React, { useState } from "react";
import Button from "../../Components/OutlinedButton";
import { Modal } from "react-bootstrap";
import { deleteNoteAction } from "./notesSlice";
import { useDispatch } from "react-redux";

export function DeleteNote({ noteId, size, onClick }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteOnClick = () => {
    dispatch(deleteNoteAction({ id: noteId }));
  };

  return (
    <>
      <Button size={size ? size : "sm"} context="danger" onClick={handleOpen}>
        DELETE
      </Button>
      <Modal
        id="deleteNoteModal"
        size="sm"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Body className="text-center">
          <p>delete this item?</p>
          <Button context="secondary" size="sm" onClick={handleClose}>
            CANCEL
          </Button>
          <Button
            context="danger"
            size="sm"
            onClick={() => {
              if (onClick) {
                onClick();
              }
              deleteOnClick();
            }}
          >
            DELETE
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
