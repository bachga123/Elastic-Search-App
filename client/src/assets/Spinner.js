import React from 'react';
import { CDBSpinner, CDBContainer } from 'cdbreact';

export const Spinner = () => {
    return (
        <CDBContainer>
            <CDBSpinner multicolor />
        </CDBContainer>
    );
};