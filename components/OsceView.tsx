
import React from 'react';
import { PrinterIcon } from './icons';
import type { OsceData } from '../types';

interface OsceViewProps {
  osceData: OsceData;
}

export const OsceView: React.FC<OsceViewProps> = ({ osceData }) => {
    if (!osceData || osceData.stations.length === 0) {
        return <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">No OSCE stations available for this module.</div>;
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center no-print">
                <h2 className="text-2xl font-bold">OSCE Stations</h2>
                <button 
                    onClick={handlePrint} 
                    className="flex items-center space-x-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
                >
                    <PrinterIcon className="w-5 h-5" />
                    <span>Print All Stations</span>
                </button>
            </div>

            <div className="printable-content space-y-8">
                {osceData.stations.map((station, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md break-inside-avoid">
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-slate-200 dark:border-slate-700">{station.name}</h3>
                        
                        <div className="mb-4">
                            <h4 className="font-bold mb-2">Checklist</h4>
                            <ul className="space-y-2">
                                {station.checklist.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-slate-400 rounded-sm mr-3 flex-shrink-0"></div>
                                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 border-t pt-4 border-slate-200 dark:border-slate-700">
                            <h4 className="font-bold mb-2">Marking Rubric</h4>
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b dark:border-slate-600">
                                        <th className="py-2">Domain</th>
                                        <th className="py-2 text-right">Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-1">History</td>
                                        <td className="py-1 text-right">{station.marks.history}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Examination</td>
                                        <td className="py-1 text-right">{station.marks.exam}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Clinical Reasoning</td>
                                        <td className="py-1 text-right">{station.marks.reasoning}</td>
                                    </tr>
                                    <tr className="font-bold border-t dark:border-slate-600">
                                        <td className="py-2">Total</td>
                                        <td className="py-2 text-right">{station.marks.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                         <div className="mt-6 border-t pt-4 border-slate-200 dark:border-slate-700">
                            <h4 className="font-bold mb-2">Global Rating</h4>
                            <div className="flex flex-wrap gap-2">
                                {osceData.global_rating.map(rating => (
                                    <div key={rating} className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border border-slate-400 rounded-full"></div>
                                        <span>{rating}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
