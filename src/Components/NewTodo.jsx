import React, { useState, useEffect, useRef } from "react";
import { CiCirclePlus } from "react-icons/ci";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { collection, addDoc } from "firebase/firestore";

import { db } from "../Firebase";

import { FaPlus } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewTodo({
  dueDate,
  user,
  setDueDate,
  fetchData,
  refreshTodoList,
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const text = useRef(null);

  const addItem = async (event) => {
    try {
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const userId = user.uid;
      const todoCollection = collection(db, `users/${userId}/todo_items`);

      const docRef = await addDoc(todoCollection, {
        text: text.current.value,
        status: "active",
        dueDate: dueDate ? dueDate.toISOString() : null,
      });

      fetchData(userId);
      text.current.value = "";
      setDueDate(null);
      refreshTodoList(userId);
      console.log("Document written with ID:", docRef.id);

      onClose();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen}>
        <FaPlus /> New List
      </Button>
      <Modal
        className="h-4/6"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="top"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New ToDo
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col place-items-start">
                  <form
                    onSubmit={addItem}
                    className="text-center space-y-4"
                  >
                    <input
                      id="todo_input"
                      type="text"
                      placeholder="Todo"
                      ref={text}
                      className="bg-gray-100 p-3 block w-full rounded-md border-0 text-[#354719] focus:outline-gray-300 "
                    />
                    <DatePicker
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                      placeholderText="Select due date"
                      dateFormat="yyyy-MM-dd"
                    />
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={addItem}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
