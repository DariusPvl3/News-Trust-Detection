import React, { useEffect, useRef } from "react";
import "../styles/Modal.css";

export const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-container">
      <div className="modal" ref={modalRef}>
        <div className="modal-header">
          <p className="close" onClick={() => onClose()}>&times;</p>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};
