import React from 'react'

import styles from './ContentHeader.module.css'
import NotificationsIcon from '@material-ui/icons/Notifications';

const ContentHeader = (props) =>  {
    const [showNotificationList, setShowNotificationList] = React.useState(false);
    
    return (
        <header className={styles.ContentHeader}>
            <div className={styles.IconSquare}>
                {props.icon}
            </div>
            <div className={styles.Title}>
                <span>{props.title}</span>
                <span>{props.subtitle}</span>
            </div>
            {props.showNotifications ?
            <div className={styles.HeaderIcons} onMouseOver={() => setShowNotificationList(true)} onMouseOut={() => setShowNotificationList(false)} >
                <NotificationsIcon />
                { showNotificationList ?
                <div className={styles.Notifications}>
                    <span>Sua dívida "IPTU" vencerá amanhã (04/04/2021).</span>
                    <hr/>
                    <span>
                        Sua dívida "Seguro" venceu ontem (01/01/2021). 
                        Regularize a situação e evite juros e multa!
                    </span>
                    <hr/>
                    <span>Sua dívida "Seguro" vencerá amanhã (01/01/2021).</span>
                </div>
                : null }
            </div>
            : null }
        </header>
    )
}

export default ContentHeader;