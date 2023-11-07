import { useEffect, useState } from 'react';
import ActionBar from '../../components/action-bar/ActionBar';
import { Link } from 'react-router-dom';

import styles from './device-list.module.css';

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
    icon: [
        id: string,
    ];
}

type uiData = {
    version: string;
    devices: uiDevice[];
}

function DeviceList() {
    const [list, setList] = useState<uiData | undefined>();
    const url = 'https://static.ui.com/fingerprint/ui/public.json';

    const getJson = async () => {
        try {
            const response = await fetch(url);
            const data: uiData = await response.json();

            setList(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("here")
        getJson();
    }, []);

    return (
        <>
            {list ? (
                <>
                    <ActionBar nTotalDevices={`${list.devices.length} Devices`} />
                    <div className={styles.list}>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product Line</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.devices.map((device) => {
                                    return (
                                        <tr key={device.id}>
                                            <td>
                                                <img 
                                                    src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_25x25.png`}
                                                />
                                            </td>
                                            <td>
                                                <Link to={`/device?id=${device.id}`} key={device.id}>
                                                    {device.line.name}
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/device?id=${device.id}`} key={device.id}>
                                                    {device.product.name}
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : ("")}
        </>
    );
};

export default DeviceList;