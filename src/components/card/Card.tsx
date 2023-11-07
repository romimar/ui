import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackLogo from '../../assets/back.svg';

import styles from './card.module.css';

type uiDevice = {
    id: string;
    product: {
        abbrev: string,
        name: string,
    };
    line: {
        id?: string;
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

function Card() {
    const [data, setData] = useState<uiData | undefined>();
    const [device, setDevice] = useState<uiDevice | undefined>();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paramValueId = queryParams.get("id");
    const url = 'https://static.ui.com/fingerprint/ui/public.json';

    const getJson = async () => {
        try {
            const response = await fetch(url);
            const data: uiData = await response.json();

            setData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getJson();

        const deviceToDisplay: uiDevice | undefined  = data?.devices.find((i) => {
            if (i.id === paramValueId) {
                return i;
            } else {
                return null;
            }
        })

        setDevice(deviceToDisplay);
    }, []);

    return (
        <>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                <img src={BackLogo} />
                Back
            </button>
            <>
                {device ? (
                    <div key={device.id} className={styles.devCard}>
                        <div className={styles.devImg}>
                            <img src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_257x257.png`} />
                        </div>
                        <div className={styles.devCaption}>
                            <h3>{device.product.name}</h3>
                            <div className={styles.devType}>{device.line.name}</div>
                            <dl>
                                <dt>Product Line</dt>
                                <dd className={styles.devName}>{device.line.name}</dd>
                                <dt>ID</dt>
                                <dd className={styles.devName}>{device.line.id}</dd>
                                <dt>Name</dt>
                                <dd className={styles.devName}>{device.product.name}</dd>
                                <dt>Short Name</dt>
                                <dd className={styles.devName}>{device.product.abbrev}</dd>
                            </dl>               
                        </div>
                    </div>
                ) : <div className={styles.devCard}><h3>Loading...</h3></div>}
            </>
        </>
    );
};

export default Card;
