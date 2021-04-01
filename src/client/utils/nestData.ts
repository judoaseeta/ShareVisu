import { NestedData, CommonDataArray } from '../types';

interface NestDataProps {
    xKey: string;
    data: CommonDataArray;
    yKey: string;
    zKey: string;
}
const createNestData = ({
    xKey,
    data,
    yKey,
    zKey
}: NestDataProps) => {
    const nestedData: NestedData = {

    };
    data.forEach( (d, index)=> {
        const nestKey = d[zKey] as string;
        if(nestedData[nestKey]) {
            const acc = nestedData[nestKey];
            const curr = [
                ...acc,
                {
                    [xKey] : d[xKey]!,
                    [yKey] : d[yKey]!
                } 
            ];
            
            nestedData[nestKey] = curr;
        } else {
            nestedData[nestKey] =[
                {
                    [xKey] : d[xKey]!,
                    [yKey] : d[yKey]!
                } 
            ]
        }
    });
   
    return nestedData;
}

export default createNestData;