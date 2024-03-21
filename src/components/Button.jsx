import PropTypes from "prop-types";
import styles from "../styles/Button.module.scss";
import { useEffect } from "react";

export default function Button({
  children,
  ariaLabel,
  hotkey,
  onClick,
  type,
  isDoubleWide,
  isActive,
}) {
  const createClassName = () => {
    let className = `${styles.button} ${styles[type]}`;
    if (isDoubleWide) {
      className += ` ${styles.doubleWide}`;
    }
    if (isActive) {
      className += ` ${styles.next}`;
    }
    return className;
  };

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === hotkey) {
        onClick();
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [hotkey, onClick]);

  return (
    <button
      onClick={onClick}
      role="button"
      className={createClassName()}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  hotkey: PropTypes.string,
  type: PropTypes.string,
  isDoubleWide: PropTypes.bool,
  isActive: PropTypes.bool,
  ariaLabel: PropTypes.string,
};
