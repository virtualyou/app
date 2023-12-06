/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import type React from 'react';
type Data = {
    id: number;
    name: string;
    rxUnit: string;
    note: string;
    item: object;
    index: number;
};
type Props = {
    data: Data[];
};
declare const PrescriptionDisplay: React.FC<Props>;
export default PrescriptionDisplay;
