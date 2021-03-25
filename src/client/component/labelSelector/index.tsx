import React from 'react';
import { PlotType } from '../../types';
//styles
import classnames from 'classnames/bind';
import styles from './styles/labelSelector.module.scss';
const cx = classnames.bind(styles);

export interface LabelSelectorProps {
    headers: string[];
    plotType: PlotType;
    isXDescent: boolean;
    isYDescent: boolean;
    xKey: string;
    yKey?: string;
    zKey?: string;
    xLabelError?: string;
    yLabelError?: string;
    onXKeySelect: (key: string) => void;
    onYKeySelect?: (key: string) => void;
    onXOrder: React.ChangeEventHandler;
    onYOrder: React.ChangeEventHandler;
}
const LabelSelector:React.FC<LabelSelectorProps>  = ({
    headers,
    plotType,
    isXDescent,
    isYDescent,
    xLabelError,
    yLabelError,
    xKey,
    yKey,
    zKey,
    onXKeySelect,
    onYKeySelect,
    onXOrder,
    onYOrder
}) => 
<form
    className={cx('form')}
>
    <div
        className={cx('wrapper')}
    >
        <div
            className={cx('selector_wrapper')}
        >
            <label
                className={cx('label',{
                    xKey: true
                })}
                htmlFor="xKey"
            >X축 레이블</label>
            <select
                id="xKey"
                value={xKey}
                onChange={(e) => onXKeySelect(e.target.value)}
            >
                {
                    headers.map((header,i) => 
                        <option
                            value={header}
                            key={`option_x${i}`}
                        >
                            {header}
                        </option>
                    )
                }
            </select>
        </div>
        <div
            className={cx('selector_wrapper')}
        >
            <label
                className={cx('label',{
                    xKey: true
                })}
                htmlFor="xDescent"
            >X축 내림차순 설정: </label>
            <input 
                id="xDescent"
                type="checkbox"
                onChange={onXOrder}
                checked={isXDescent}
            />
        </div>
        {
            xLabelError &&
            <p
                className={cx('labelError',{
                    xKey: true
                })}
            >{xLabelError}</p>
        }
    </div>
    {
        (plotType === 'scatter') &&
        yKey &&
        onYKeySelect &&
        <div
            className={cx('wrapper')}
        >
            <div
                className={cx('selector_wrapper')}
            >
                <label
                    htmlFor="yKey"
                    className={cx('label',{
                        yKey: true
                    })}
                >Y축 레이블</label>
                <select
                    id="yKey"
                    value={yKey}
                    onChange={(e) => onYKeySelect(e.target.value)}
                >
                    {
                        headers.map((header,i) => 
                            <option
                                value={header}
                                key={`option_y${i}`}
                            >
                                {header}
                            </option>
                        )
                    }
                </select>
            </div>
            <div
                className={cx('selector_wrapper')}
            >
                <label
                    className={cx('label',{
                        yKey: true
                    })}
                    htmlFor="yDescent"
                >Y축 내림차순 설정: </label>
                <input 
                    id="yDescent"
                    type="checkbox"
                    onChange={onYOrder}
                    checked={isYDescent}
                />
            </div>
            {
                yLabelError &&
                <p
                    className={cx('labelError',{
                        yKey: true
                    })}
                >{yLabelError}</p>
            }
        </div>
    }
</form>;

export default LabelSelector;
