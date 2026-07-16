import "./Button.css";

function Button({

    text,
    icon,
    type = "primary",
    onClick,
    disabled = false,
    className = "",
    style = {},
    children,
    ...props

}) {

    return (

        <button

            className={`btn btn-${type} ${className}`}

            onClick={onClick}

            disabled={disabled}

            style={style}

            {...props}

        >

            {icon && (

                <span className="btn-icon">

                    {icon}

                </span>

            )}

            {text || children}

        </button>

    );

}

export default Button;