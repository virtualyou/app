/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import type React from 'react';
import './custom.css';
type Data = {
    id: number;
    name: string;
    type: string;
    due: string;
    note: string;
    item: object;
    index: number;
};
type Props = {
    data: Data[];
};
declare const DebtDisplay: React.FC<Props>;
export default DebtDisplay;
