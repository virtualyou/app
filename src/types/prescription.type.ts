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

prescription.type.ts - Prescription type interface
@author David L Whitehurst

*/

export default interface Prescription {
    id: number,
    name: string,
    identNo: string,
    size: string,
    form: string,
    rxUnit: string,
    quantity: string,
    pharmacy: string,
    pharmacyPhone: string,
    written: string,
    writtenBy: string,
    filled: string,
    expires: string,
    refillNote: string,
    manufacturedBy: string,
    note: string,
    userKey: number
}
