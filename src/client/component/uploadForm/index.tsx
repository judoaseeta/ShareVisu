import React from 'react';
import Button from '../../component/button';
import { PlotType } from '../../types';
import PlotTypeToText from '../../utils/plotTypeToText';

import styles from './styles/uploadForm.module.scss';

interface UploadFormProps {
    onSubmit: React.FormEventHandler;
    plotType:PlotType;
    xKey: string;
    yKey?: string;
    zKey?: string;
    xLabel: string;
    yLabel?: string;
    zLabel?: string;
    title: string;
}
const UploadForm: React.FC<UploadFormProps> = ({
    onSubmit,
    plotType,
    xKey,
    yKey,
    zKey,
    xLabel,
    yLabel,
    zLabel,
    title
}) => 
<form
    className={styles.form}
    onSubmit={onSubmit}
>
    <div>
        <h4>플랏 정보</h4>
        <p>플랏 유형: {PlotTypeToText(plotType)}</p>
        <p>플랏명: {title}</p>
        <p>X축 레이블: {xLabel}</p>
        {
            yLabel &&
            <p>Y축 레이블: {yLabel}</p>
        }
        {
            zLabel &&
            <p>Z축 레이블: {zLabel}</p>
        }
        <hr />
        <h4>데이터 정보</h4>
        <p>X-Key: {xKey}</p>
        {
            yKey &&
            <p>Y-Key: {yKey}</p>
        }
        {
            zKey &&
            <p>Z-Key: {zKey}</p>
        }
    </div>
    <Button
        type="submit"
    >
        업로드
    </Button>
</form>;

export default UploadForm;
