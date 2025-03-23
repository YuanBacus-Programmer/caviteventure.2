"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{title}</h2>
        {children}
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999
  },
  modal: {
    background: "#fff",
    margin: "100px auto",
    padding: "20px",
    maxWidth: "500px",
    borderRadius: "8px",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
  },
  closeButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    background: "#0070f3",
    color: "#fff",
    cursor: "pointer"
  }
};
