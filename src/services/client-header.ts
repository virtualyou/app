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

client-header.ts - Special HTTP Header to get owner (user) from app
@author David L Whitehurst

*/
import CryptoUtils from '../utility/crypto.utils';

const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';

export default function clientHeader() {

    // hash clientId and secret
    const hashedClientId = CryptoUtils.createHash(clientId);
    const hashedClientSecret = CryptoUtils.createHash(clientSecret);
    console.log("hashedClientId:" + hashedClientId);
    console.log("hashedClientSecret:" + hashedClientSecret);

    // base64 encrypted
    const encoded1 = btoa(hashedClientId);
    const encoded2 = btoa(hashedClientSecret);
    console.log("hashedEncodedClientId:" + encoded1);
    console.log("hashedEncodedClientSecret:" + encoded2);

    // return headers
    return {
        'client_id': encoded1,
        'client_secret': encoded2
    };
}