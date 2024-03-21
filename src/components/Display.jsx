import PropTypes from "prop-types";
import styles from "../styles/Display.module.scss";

export default function Display({ value }) {
  return (
    <input
      tabIndex="0"
      alt={value}
      className={styles.display}
      type="text"
      value={value}
      readOnly
      aria-label={value}
      role="status"
    />
  );
}

Display.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
