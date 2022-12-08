import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectUserActivity, selectUserInfo } from '../../../modules';
import { DeviceIcon } from '../../../assets/images/ProfileIcon';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import { Table } from '../../../components';

const DeviceTableComponent = () => {
    const userActivity = useSelector(selectUserActivity);

    const getTableHeaders = () => {
        return ['Trusted Device', 'Login Region', 'Recent Acticity', 'IP Address', 'Remove Device'];
    };

    const getTableBody = (userActivity) => {
        return userActivity.map((item) => [
            <div className="d-flex align-items-center">
                <DeviceIcon />
                <p className="mb-0 text-sm grey-text-accent">{item.user_agent}</p>
            </div>,
            <p className="mb-0 text-sm grey-text-accent">{item.region}</p>,
            <p className="mb-0 text-sm grey-text-accent">{item.action}</p>,
            <p className="mb-0 text-sm grey-text-accent">{item.user_ip}</p>,
            <p className="mb-0 text-sm grey-text-accent">
                <CloseIcon fill="#B5B3BC" />
            </p>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="px-24">
                <div className="row">
                    <div className="col-12">
                        <h6 className="text-md font-semibold white-text">Login Device and Ip Address</h6>
                        <Table header={getTableHeaders()} data={getTableBody(userActivity)} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const ProfileDeviceTable = React.memo(DeviceTableComponent);
