import "../styles/ThemeToggle.css";

export const ThemeToggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input type="checkbox" id="check" className="toggle" onChange={handleChange} checked={isChecked} />
      <label htmlFor="check"></label>
    </div>
  );
};
