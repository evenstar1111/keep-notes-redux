import React, { useState } from "react";
import Button from "../../Components/OutlinedButton";
import { Modal } from "react-bootstrap";
import { deleteTodoAction } from "./todosSlice";
import { useDispatch } from "react-redux";

export function DeleteTodo({ todoId, size, onClick }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteOnClick = () => {
    dispatch(deleteTodoAction({ id: todoId }));
  };

  return (
    <>
      <Button size={size ? size : "sm"} context="danger" onClick={handleOpen}>
        DELETE
      </Button>
      <Modal
        id="deleteTodoModal"
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
