import { Plot } from '../../api';

export const summaries = [
    {
        "created": 1616602318859,
        "SK": "8965a93f-41ba-47c0-8bc2-40e13650fd89",
        "plotType": "scatter",
        "title": "범죄율과 지지율의 관계"
    },
    {
        "created": 1616602318859,
        "SK": "8965a93f-41ba-47c0-8bc2-40ed13650fd89",
        "plotType": "scatter",
        "title": "범죄율과 지지율의 관계"
    },
    {
        "created": 1616602318859,
        "SK": "8965a93f-41ba-47c0-8bc2-40es13650fd89",
        "plotType": "scatter",
        "title": "범죄율과 지지율의 관계"
    }
];

export const mockScatterPlot: Plot = {
    plotType: "scatter",
    yLabel: "지지율",
    yKey: "support",
    xLabel: "범죄율",
    data: [
      {
        support: 32,
        crime: 13
      },
      {
        support: 22,
        crime: 14
      },
      {
        support: 99,
        crime: 3
      },
      {
        support: 62,
        crime: 44
      }
    ],
    created: 1616602318859,
    SK: "8965a93f-41ba-47c0-8bc2-40e13650fd89",
    PK: "Plot",
    xKey: "crime",
    title: "범죄율과 지지율의 관계"
};