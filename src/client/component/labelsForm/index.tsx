import React from 'react';
import Button from '../button';
import { PlotType } from '../../types';
import styles from './styles/labelsForm.module.scss';
import plot from 'src/client/pages/plotViews/plot';

interface LabelsFormProps {
    xLabel: string;
    yLabel: string;
    zLabel: string;
    zKey: string;
    title: string;
    plotType: PlotType;
    onXLabelChange: React.ChangeEventHandler;
    onYLabelChange: React.ChangeEventHandler;
    onZLabelChange: React.ChangeEventHandler;
    onTitleChange: React.ChangeEventHandler
    onSubmit: React.FormEventHandler;
}
const LabelsForm:React.FC<LabelsFormProps> = ({
    xLabel,
    yLabel,
    zLabel,
    zKey,
    plotType,
    title,
    onTitleChange,
    onXLabelChange,
    onYLabelChange,
    onZLabelChange,
    onSubmit
}) => 
<form
    className={styles.form}
    onSubmit={onSubmit}
>
    <div
        className={styles.wrapper}
    >
        <label
            htmlFor="xLabel"
        >
            X축 레이블
        </label>
        <input 
            id="xLabel"
            onChange={onXLabelChange}
            value={xLabel}
        />
    </div>
    <div
        className={styles.wrapper}
    >
        <label
            htmlFor="yLabel"
        >
            Y축 레이블
        </label>
        <input 
            id="yLabel"
            onChange={onYLabelChange}
            value={yLabel}
        />
    </div>
    {
        (plotType === 'line') &&
        (zKey && zKey !== '-') &&
        <div
            className={styles.wrapper}
        >
        <label
            htmlFor="zLabel"
        >
            Z축 레이블
        </label>
        <input 
            id="zLabel"
            onChange={onZLabelChange}
            value={zLabel}
        />
    </div>
    }
    <div
        className={styles.wrapper}
    >
        <label
            htmlFor="title"
        >
            플랏 제목
        </label>
        <input 
            id="title"
            onChange={onTitleChange}
            value={title}
        />
    </div>
    <Button
        type="submit"
    >확인</Button>
</form>;

export default LabelsForm;
