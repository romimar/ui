import styles from './search-input.module.css';

const SearchInput = ({
    onChange,
}: { onChange: React.ChangeEventHandler }) => {
    return (
        <input
            className={styles.inputSearch}
            type="text"
            onChange={onChange}
            placeholder="Search"
        />
    );
};

export default SearchInput;