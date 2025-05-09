// Chapter23CentralProcessingUnit (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

let Chapter23CentralProcessingUnit = 
{
    name: "Chapter23CentralProcessingUnit",
    transform: { x: 25, y: 100, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 3,
    cpuIncludeJumps: false,
    cpuAltMemory: false,

    components:
    [
        { name: "cpu", type: "External", file: "Chapter23CPUCommon" },
    ],
    wires:
    [
    ]
}