import { useEffect, useState } from 'react';
import ActionBar from '../action-bar/ActionBar';
import { Link } from 'react-router-dom';

import styles from './device-list-grid.module.css';

type uiDevice = {
    id: string;
    product: {
        abbrev: string,
        name: string,
    };
    line: {
        abbrev: string,
        name: string,
    };
    icon: {
        id: string,
    };
}

type uiData = {
    version: string;
    devices: uiDevice[];
}

function DeviceListGrid() {
    const [grid, setGrid] = useState<uiData | undefined>();
    const url = 'https://static.ui.com/fingerprint/ui/public.json';

    const getJson = async () => {
        try {
            const response = await fetch(url);
            const data: uiData = await response.json();

            setGrid(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getJson();
    }, []);

    return (
        <>
            {grid ? (
                <>
                    <ActionBar nTotalDevices={`${grid.devices.length} Devices`} />
                    <div className={styles.grid}>
                        {grid.devices.map((device) => {
                            return (
                                <Link className={styles.card} to={`/device?id=${device.id}`} key={device.id}>
                                    <div className={styles.device}>
                                        <img src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_101x101.png`} />
                                    </div>
                                    <div className={styles.caption}>
                                        <div className={styles.deviceName}>{device.product.name}</div>
                                        <div className={styles.deviceType}>{device.line.name}</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </>
            ) : ("")}
        </>
    );
};

export default DeviceListGrid;
