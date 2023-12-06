import { jsx as _jsx } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
const HcaptchaComponent = (props) => {
    const { sitekey } = props;
    const captchaRef = React.useRef(null);
    const onLoad = () => {
        if (captchaRef.current) {
            captchaRef.current.execute();
        }
    };
    const handleVerificationSuccess = (token, ekey) => {
        console.log(ekey);
        console.log(`hCaptcha Token: ${token}`);
    };
    return (_jsx(HCaptcha, { sitekey: sitekey, onVerify: handleVerificationSuccess, ref: captchaRef, onLoad: onLoad }));
};
export default HcaptchaComponent;
//# sourceMappingURL=HcaptchaComponent.js.map