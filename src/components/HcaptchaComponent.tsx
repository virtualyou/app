/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface Props {
    sitekey: string;
}

const HcaptchaComponent: React.FC<Props> = (props) => {
    const { sitekey } = props;
    const captchaRef = React.useRef<HCaptcha>(null);

    const onLoad = () => {
        if (captchaRef.current) {
            captchaRef.current.execute();
        }
    };

    const handleVerificationSuccess = (token: string, ekey: string) => {
        console.log(ekey);
        console.log(`hCaptcha Token: ${token}`);
    };

    return (
        <HCaptcha
            sitekey={sitekey}
            onVerify={handleVerificationSuccess}
            ref={captchaRef}
            onLoad={onLoad}
        />
    );
};

export default HcaptchaComponent;
