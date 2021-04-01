import React from 'react';
import {
    withRouter,
    RouteComponentProps
} from 'react-router-dom';
//components 
import HelmetComponent from '../../component/helmet';
import Button from '../../component/button';
import Loading from '../../component/loading';
import Stepper from '../../component/stepper';
import DataTable from '../../component/dataTable';
import LabelSelector from '../../component/labelSelector';
import LabelsForm from '../../component/labelsForm';
import UploadForm from '../../component/uploadForm';
// page
import ScatterPlot from './scatterPlot';
import LinePlot from './linePlot';
// hooks
import useCreatePlot from '../../hooks/useCreatePlot';

// types
import { PlotType } from '../../types';
// styles
import classnames from 'classnames/bind';
import styles from '../styles/plot.module.scss';

const cx = classnames.bind(styles);

type PlotBaseProps = {

} & RouteComponentProps<{
    plot: PlotType
}>
const PlotBase: React.FC<PlotBaseProps> = ({
    match: {
        params: {
            plot
        }
    }
}) => {

    const  { 
        data,
        fileInputRef,
        headers,
        isUploading,
        isXdescent,
        isYdescent,
        xLabelError,
        yLabelError,
        xKey,
        yKey,
        zKey,
        xLabel,
        yLabel,
        zLabel,
        title,
        step,
        onSubmit,
        onXLabelChange,
        onYLabelChange,
        onZLabelChange,
        onTitleChange,
        selectXKey,
        selectYKey,
        selectZKey,
        onKeyConfirm,
        toStep1,
        toStep2,
        toStep3,
        onXOrder,
        onYOrder,
        onFileInputChange,
        onUploadSubmit
    } = useCreatePlot({
            plotType: plot
        });
    return <section
        className={cx('page')}
    >
        <HelmetComponent 
            title="당신만의 플랏을 만들어 보세요."
            description="데이터 파일(CSV)을 불러오고, 테이블을 통해 데이터 유형을 파악합니다.각 축의 키를 고르고, 레이블의 이름을 정하고, 차트를 확인한 뒤 업로드하세요."
        />
        <div
            className={cx('holder',{
                instep: true
            })}
        >
            <Stepper
                step={step} 
                toStep1={toStep1}
                toStep2={toStep2}
                toStep3={toStep3}
            />
        </div>
        <div
            className={cx('holder',{
                instep: step === 0
            })}
        >
            <input 
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={onFileInputChange}
            />
        </div>
        <div
            className={cx('holder',{
                instep: step === 1
            })}
        >
            {
                headers &&
                <LabelSelector 
                    headers={headers}
                    isXDescent={isXdescent}
                    isYDescent={isYdescent}
                    xKey={xKey}
                    yKey={yKey}
                    zKey={zKey}
                    onXKeySelect={selectXKey}
                    onYKeySelect={selectYKey}
                    onZKeySelect={selectZKey}
                    onXOrder={onXOrder}
                    onYOrder={onYOrder}
                    plotType={plot}
                    xLabelError={xLabelError}
                    yLabelError={yLabelError}
                />
            }
            {
                headers &&
                data &&
                <DataTable 
                    headers={headers}
                    dataLength={data.length}
                    samples={data.slice(0,10)}
                    xKey={xKey}
                    yKey={yKey}
                    zKey={zKey}
                />
            }
            <Button
                onClick={onKeyConfirm}
                type="button"
            >설정</Button>
        </div>
        <div
            className={cx('holder',{
                instep: step === 2
            })}
        >
            <LabelsForm 
                xLabel={xLabel}
                yLabel={yLabel}
                zLabel={zLabel}
                zKey={zKey}
                plotType={plot}
                title={title}
                onTitleChange={onTitleChange}
                onSubmit={onSubmit}
                onXLabelChange={onXLabelChange}
                onYLabelChange={onYLabelChange}
                onZLabelChange={onZLabelChange}
            />
        </div>
        <div
            className={cx('holder',{
                instep: step === 3
            })}
        >
            {
                plot === 'scatter' &&
                <ScatterPlot 
                    data={data}
                    isXDescent={isXdescent}
                    isYDescent={isYdescent}
                    title={title}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    xKey={xKey}
                    yKey={yKey}
                    xLabelError={xLabelError}
                    yLabelError={yLabelError}
                />
            }
            {
                plot ==='line' &&
                <LinePlot 
                    data={data}
                    isYDescent={isYdescent}
                    title={title}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    zLabel={zLabel}
                    xKey={xKey}
                    yKey={yKey}
                    zKey={zKey}
                    xLabelError={xLabelError}
                    yLabelError={yLabelError}      
                />
            }
        </div>
        <div
            className={cx('holder',{
                instep: step === 3
            })}
        >
            <UploadForm 
                xKey={xKey}
                yKey={yKey}
                zKey={zKey}
                xLabel={xLabel}
                yLabel={yLabel}
                zLabel={zLabel}
                title={title}
                plotType={plot}
                onSubmit={onUploadSubmit}
            />  
        </div>
        <Loading 
            isLoading={isUploading}
            isFull={true}
            message="플랏을 업로드하는 중입니다..."
        />
    </section>
};


export default withRouter(PlotBase);