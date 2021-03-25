import React from 'react';
//styles
import classnames from 'classnames/bind';
import styles from './styles/dataTable.module.scss';
const cx = classnames.bind(styles);

export interface DataTableProps {
    headers: string[];
    xKey: string;
    yKey: string;
    zKey?: string; 
    samples: Array<{ [key: string] : string|undefined}>;
    dataLength: number;
}
const DataTable: React.FC<DataTableProps> = ({
    headers,
    xKey,
    yKey,
    zKey,
    samples,
    dataLength
}) => 
<table
    className={cx('table')}
>
    <tbody
        className={cx('tbody')}
    >
        {
            headers.slice(1).map( header => 
                <tr
                    className={cx('tr',{
                        warn: (xKey === header && yKey === header) || (xKey === header && zKey === header) || (yKey === header && zKey === header)
                    })}
                    key={`row-${header}`}
                >
                    <th
                        className={cx('th',{
                            xKey: header === xKey,
                            yKey: header === yKey,
                            zKey: header === zKey,
                        })}
                    >{header}</th>
                    {
                        samples.map(( sample,i) => 
                        <td
                        className={cx('td',{
                            xKey: header === xKey,
                            yKey: header === yKey,
                            zKey: header === zKey,
                        })}
                            key={`sample-${header}${i}}`}
                        >
                            {sample[header]}
                        </td>
                        )
                    }
                </tr>
            )
        }
        {
            dataLength > 10 ?  
            <tr><td>{dataLength - 10}개의 샘플이 더 있습니다.</td></tr>
            : null
        }
    </tbody>
</table>

export default DataTable;