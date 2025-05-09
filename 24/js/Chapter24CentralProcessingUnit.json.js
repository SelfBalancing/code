// Chapter24CentralProcessingUnit (c) Charles Petzold, 2024

let Chapter24CentralProcessingUnit = 
{
    name: "Chapter24CentralProcessingUnit",
    transform: { x: 25, y: 100, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 3,
    cpuIncludeJumps: true,
    cpuAltMemory: true,

    components:
    [
        { name: "cpu", type: "External", file: "Chapter23CPUCommon" },
    ],
    wires:
    [
        { points:[{ name:"cpu.alu", io: "CY Flag", output: "cyflag"}, { name:"cpu.instDecoder", io: "CY Flag", input: "cyflag"}], arrow: "end"},
        { points:[{ name:"cpu.alu", io: "Z Flag", output: "zflag"}, { name:"cpu.instDecoder", io: "Z Flag", input: "zflag"}], arrow: "end"},
        { points:[{ name:"cpu.alu", io: "S Flag", output: "sflag"}, { name:"cpu.instDecoder", io: "S Flag", input: "sflag"}], arrow: "end"},
    ]
}