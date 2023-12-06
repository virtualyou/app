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

EmailParams.ts - Function getParams for Agent and Monitor emails
@author David L Whitehurst

*/

import Params from "../types/params.type.ts";

export function getParams(recp: string, body: string, subject: string, src: string) {
    const params: Params = {
        Destination: { ToAddresses: [recp] },
        Message: {
            Body: { Text: { Data: body } },
        Subject: { Data: subject }
        },
        Source: src
    }
    return params;
}





