import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../search-input/SearchInput';
import ListLogo from '../../assets/list-view.svg';
import GridLogo from '../../assets/grid-view.svg';

import styles from './action-bar.module.css';

export interface SearchQuery {
    searchDevice: string;
}

interface Props {
    nTotalDevices: string;
}

function ActionBar({nTotalDevices}: Props) {
    const [searchQuery, setSearchQuery] = useState<SearchQuery>({} as SearchQuery);

    return (
        <div className={styles.barWrapper}>
            <div className={styles.searchWrapper}>
                <SearchInput onChange={(searchDevice) => setSearchQuery({...searchQuery})} />
                { nTotalDevices }
            </div>
            <div className={styles.filterWrapper}>
                <Link to={"/"}>
                    <img src={ListLogo} />
                </Link>
                <Link to={"/grid"}>
                    <img src={GridLogo} />
                </Link>
                <div className={styles.links}>Filter</div>
            </div>
        </div>
    );
};

export default ActionBar;