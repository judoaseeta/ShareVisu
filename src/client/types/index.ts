export type PlotType = 'scatter' | 'dot' | 'line';
export type CommonDataArray = Array<{ [key: string] : string|number|undefined}>;

export type NestedData = {
    [key: string] : Array<{ [key: string] : string| number | undefined}>;
};