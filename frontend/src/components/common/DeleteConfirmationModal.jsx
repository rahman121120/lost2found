import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
    isOpen,
    title = "Delete Item",
    message = "Are you sure you want to delete this item?",
    onCancel,
    onConfirm
}) {

    if (!isOpen) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <div className="modal-header">

                    <h2>{title}</h2>

                </div>

                <div className="modal-body">

                    <p>{message}</p>

                </div>

                <div className="modal-footer">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteConfirmationModal;