import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { addFilter } from 'redux/filterSlice';
import css from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFinding = e => {
    const inputValue = e.target.value;
    const lowerValue = inputValue.toLowerCase();
    dispatch(addFilter(lowerValue));
  };

  const filterInputId = nanoid();
  return (
    <>
      <label htmlFor={filterInputId}>Find contacts by name</label>
      <input
        id={filterInputId}
        className={css.filterInput}
        type="text"
        name="filter"
        value={filter}
        title="Find contact by name"
        onChange={handleFinding}
      ></input>
    </>
  );
};

export default Filter;
