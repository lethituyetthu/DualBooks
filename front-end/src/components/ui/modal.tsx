const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  