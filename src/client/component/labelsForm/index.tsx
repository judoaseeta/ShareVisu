import React from 'react';
import Button from '../button';

import styles from './styles/labelsForm.module.scss';

interface LabelsFormProps {
    xLabel: string;
    yLabel: string;
    title: string;
    onXLabelChange: React.ChangeEventHandler;
    onYLabelChange: React.ChangeEventHandler;
    onTitleChange: React.ChangeEventHandler
    onSubmit: React.FormEventHandler;
}
const LabelsForm:React.FC<LabelsFormProps> = ({
    xLabel,
    yLabel,
    title,
    onTitleChange,
    onXLabelChange,
    onYLabelChange,
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
