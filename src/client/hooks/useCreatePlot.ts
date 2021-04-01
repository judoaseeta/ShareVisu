import { 
    useCallback,
    useEffect,
    useState,
    useMemo,
    useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { csvParse } from 'd3-dsv';
import { checkIsKeySelected, checkIsNumOrFraction } from '../utils/checkDatas';
import { PlotType } from '../types';
import {
    addPlot,
    AddPlotArgs
} from '../api';
import plot from '../pages/plotViews/plot';

interface UseCreatePlotProps {
    plotType: PlotType;
}

const UseCreatePlot = ({
    plotType
}:UseCreatePlotProps) => {
    const history = useHistory();
    // set steps of making plot
    const [step , setStep ] = useState<0|1|2|3>(0);
    const onSetStep = useCallback((step: 0|1|2|3) => {
        setStep(step);
    },[]);
    // load file from input and parsed
    const [ parsedFile, setParsedFile] = useState('');
    const [ fileName, setFileName ] = useState('');
    const fileInputRef = useRef<HTMLInputElement|null>(null);
    const parseFile = useCallback(async(file:File) => {
        setFileName(file.name);
        const text = await file.text();
        await setParsedFile(text);
    },[

    ]);
    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        if(e.target.files) {
            const file = e.target.files[0];
            parseFile(file);
        }
    },[

    ]);
    // function for reset FileInput;
    const fileInputReset = useCallback(() => {
        const fileInput = fileInputRef.current;
        if(fileInput) {
            fileInput.value = '';
        }
    },[
        fileInputRef
    ]);

    // parsed data;
    const [ data, setData ] = useState<Array<{ [key: string]: string | undefined}>|null>(null);
    // headers of CSV
    const [ headers, setHeaders ] = useState<string[]|null>(null);
    // keys
    const [ xKey, setXKey ]= useState('-');
    const [ yKey, setYKey ]= useState('-');
    const [ zKey, setZkey] = useState('-');
    // checks for using value as descent order
    const [ isXdescent, setIsXDescent] = useState(false);
    const [ isYdescent, setIsYDescent] = useState(false);

    // helper function for parsing CSV
    const parsingCsv = useCallback((src: string) => {
        if(src) {
            const data = csvParse(src);
            setData(data.slice(0,data.length-1));
            setHeaders(["-",...data.columns]);
            setStep(1);
        }
    },[
    ]);

    // label errors
    const xLabelError = useMemo(() => {
        if(data && xKey !== '-') {
            const isEveryXLabelNumeric = data.every( d => checkIsNumOrFraction(d[xKey]!));
            if(plotType === 'scatter') {
                if(!isEveryXLabelNumeric) {
                    return '스캐터 플랏의 X축 키에 할당되는 값은 정수 혹은 소수의 숫자여야 합니다.';
                } else {
                    return '';
                }
            } else if (plotType === 'dot') {
                if(!isEveryXLabelNumeric) {
                    return '닷 플랏의 X축 키에 할당되는 값은 정수 혹은 소수의 숫자여야 합니다.';
                } else {
                    return '';
                }
            }
        } else if(data) {
            if(plotType === 'scatter') {
                return '(스캐터 플랏)X축 키에 정수 혹은 소수인 레이블을 할당하세요';
            } else {
                return '';
            }
        }
    },[
        data,
        xKey,
        plotType
    ]);
    const yLabelError = useMemo(() => {
        if(data && yKey !== '-') {
            const isEveryYLabelNumeric = data.every( d => checkIsNumOrFraction(d[yKey]!));
            if(plotType === 'scatter') {
                if(!isEveryYLabelNumeric) {
                    return '스캐터 플랏의 Y축 키에 할당되는 값은 정수 혹은 소수의 숫자여야 합니다.';
                } else {
                    return '';
                }
            } else if(plotType === 'line') {
                if(!isEveryYLabelNumeric) {
                    return '스캐터 플랏의 Y축 키에 할당되는 값은 정수 혹은 소수의 숫자여야 합니다.';
                } else {
                    return '';
                }
            }
        } else if(data) {
            if(plotType === 'scatter') {
                return '(스캐터 플랏)Y축 키에 정수 혹은 소수인 레이블을 할당하세요';
            } else if (plotType === 'line') {
                return '(스캐터 플랏)Y축 키에 정수 혹은 소수인 레이블을 할당하세요';
            }
        }
    },[
        data,
        yKey,
        plotType
    ]);

    const zLabelError = useMemo(() => {
        if(plotType === 'line') {
            
        }
    },[
        data,
        zKey,
        plotType
    ]);
    /// if parsedFile , parse CSV
    useEffect(() => {
        parsingCsv(parsedFile);
    },[
        parsedFile
    ]);
    // event handler for keys
    const selectXKey = useCallback((key: string) => {
        if(headers && headers.includes(key)) {
            setXKey(key);
        }
    },[
        headers
    ]);
    const selectYKey = useCallback((key: string) => {
        if(headers && headers.includes(key)) {
            setYKey(key);
        }
    },[
        headers
    ]);
    const selectZKey = useCallback((key: string) => {
        if(headers && headers.includes(key)) {
            setZkey(key);
        }
    },[
        headers
    ]);

    /// event handlers for data order
    const onXOrder:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setIsXDescent(e.target.checked);
    },[]);
    const onYOrder:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setIsYDescent(e.target.checked);
    },[]);


    const onKeyConfirm = useCallback(() => {
        if(plotType === 'scatter' || plotType === 'line') {
            if(xKey && yKey && !xLabelError && !yLabelError) {
                setStep(2);
            }
        }
    },[
        xKey,
        yKey,
        zKey,
        xLabelError,
        yLabelError,
        plotType
    ]);

    /// reset all data
    const toStep1 = useCallback(() => {
        fileInputReset();
        setData(null);
        setXKey('-');
        setYKey('-');
        setZkey('-')
        setStep(0);
    },[
        fileInputReset
    ]);
    const toStep2 = useCallback(() => {
        setStep(1);
    },[
        
    ]);
    /////

    const [ xLabel, setXLabel ] = useState(`X-LABEL(${xKey})`);
    const [ yLabel, setYLabel ] = useState(`Y-LABEL(${yKey})`);
    const [ zLabel, setZLabel ] = useState(`Z-LABEL(${zKey})`);
    const [ title, setTitle ] = useState(`PLOT-${fileName}`);
    const onXLabelChange:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setXLabel(e.target.value);
    },[]);
    const onYLabelChange:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setYLabel(e.target.value);
    },[]);
    const onZLabelChange:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setZLabel(e.target.value);
    },[]);
    const onTitleChange:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setTitle(e.target.value);
    },[]);
    const onSubmit:React.FormEventHandler = useCallback((e) => {
        e.preventDefault();
        if(plotType === 'scatter' && xLabel && yLabel && title) {
            setStep(3);
        } else if(plotType === 'line' && xLabel && yLabel && zLabel&& title) {
            setStep(3);
        }
    },[
        xLabel,
        yLabel,
        zLabel,
        title,
        plotType
    ]);
    const toStep3 = useCallback(() => {
        setStep(2);
    },[
        
    ]);

    
   
    const [ isUploading , setIsUploading ] = useState(false);
    const UploadPlot = useCallback(async (data: AddPlotArgs) => {
        try {
            setIsUploading(true);
            await addPlot(data);
            setIsUploading(false);
            history.push('/');
        } catch(e) {
            setIsUploading(false);
            alert(e.message);
        }
    },[
        history
    ]);
    const onUploadSubmit: React.FormEventHandler = useCallback((e) => {
        e.preventDefault();
        if(step === 3) {
            if(plotType === 'scatter') {
                if(xLabel && yLabel && data && xKey && yKey) {
                    const PickedData = data.map(d => ({
                        [xKey] : d[xKey],
                        [yKey] : d[yKey]
                    }));
                
                    UploadPlot(
                    {
                        title,
                        xKey,
                        yKey,
                        xLabel,
                        yLabel,
                        data: PickedData,
                        plotType    
                    });
                }
            } else if(plotType === 'line') { 
                if(xLabel && yLabel && data && xKey && yKey) {
                    
                    if(checkIsKeySelected(zKey) && zLabel) {
                        const PickedData = data.map(d => ({
                            [xKey] : d[xKey],
                            [yKey] : d[yKey],
                            [zKey] : d[zKey]
                        }));
                    
                        UploadPlot(
                            {
                                title,
                                xKey,
                                yKey,
                                zKey,
                                xLabel,
                                yLabel,
                                zLabel,
                                data: PickedData,
                                plotType    
                            }
                        );
                    } else {
                        const PickedData = data.map(d => ({
                            [xKey] : d[xKey],
                            [yKey] : d[yKey]
                        }));    
                        UploadPlot(
                            {
                                title,
                                xKey,
                                yKey,
                                xLabel,
                                yLabel,
                                data: PickedData,
                                plotType    
                            }
                        );
                    }
                }
            }
        }
    },[
        step,
        xKey,
        yKey,
        xLabel,
        yLabel,
        zKey,
        zLabel
    ]);

    return {
        fileInputRef,
        data,
        headers,
        isXdescent,
        isYdescent,
        xLabelError,
        yLabelError,
        xKey,
        yKey,
        zKey,
        isUploading,
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
    }
}

export default UseCreatePlot;
