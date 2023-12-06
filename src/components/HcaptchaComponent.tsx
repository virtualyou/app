/*
Copyright 2023 VirtualYou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

HcaptchaComponent.tsx - integration for Captcha (component)
@author David L Whitehurst

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
