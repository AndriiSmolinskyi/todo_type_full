import React from 'react';
import * as styles from './toggle.button.style';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleButton: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className={styles.switchStyles}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider" />
    </label>
  );
};

export default ToggleButton;