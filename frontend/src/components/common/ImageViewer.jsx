import "./ImageViewer.css";

function ImageViewer({ image, title, isOpen, onClose }) {

    if (!isOpen) {

        return null;

    }

    return (

        <div
            className="image-viewer-overlay"
            onClick={onClose}
        >

            <div
                className="image-viewer-container"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="image-viewer-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <img
                    src={image}
                    alt={title}
                    className="image-viewer-image"
                />

                <h3 className="image-viewer-title">

                    {title}

                </h3>

            </div>

        </div>

    );

}

export default ImageViewer;