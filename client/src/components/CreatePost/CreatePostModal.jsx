import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import CreatePost from '../CreatePost/CreatePost';
import './createpostmodal.css';

const CreatePostModal = ({ closeModal }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <CreatePost closeModal={closeModal} />
      </div>
    </div>,
    document.body
  );
};

export default CreatePostModal;
