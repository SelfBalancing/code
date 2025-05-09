// Chapter18NixieDecoder (c) Charles Petzold, 2024

let Chapter18NixieDecoder = 
{
    name: "Chapter18NixieDecoder",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "decoder", type: "External", file: "Chapter18BcdDecoder"},
            { name: "tube", type: "NixieTube", y: -115 },

            { name: "and0outJoint", type: "Joint", y: -60, relative: { xy: { name: "decoder.and0", io: "out" }}},
            { name: "tube0Joint", type: "Joint", relative: { x: { name: "tube", io: "0" }, y: { name: "and0outJoint" }}},
            { name: "and1outJoint", type: "Joint", y: -50, relative: { xy: { name: "decoder.and1", io: "out" }}},
            { name: "tube1Joint", type: "Joint", relative: { x: { name: "tube", io: "1" }, y: { name: "and1outJoint" }}},
            { name: "and2outJoint", type: "Joint", y: -40, relative: { xy: { name: "decoder.and2", io: "out"}}},
            { name: "tube2Joint", type: "Joint", relative: {x: { name: "tube", io: "2"}, y: { name: "and2outJoint" }}},
            { name: "and3outJoint", type: "Joint", y: -30, relative: { xy: { name: "decoder.and3", io: "out"}}},
            { name: "tube3Joint", type: "Joint", relative: { x: { name: "tube", io: "3"}, y: { name: "and3outJoint" }}},
            { name: "and4outJoint", type: "Joint", y: -20, relative: { xy: { name: "decoder.and4", io: "out"}}},
            { name: "tube4Joint", type: "Joint", relative: { x: { name: "tube", io: "4"}, y: { name: "and4outJoint" }}},
            { name: "and5outJoint", type: "Joint", y: -20, relative: { xy: { name: "decoder.and5", io: "out"}}},
            { name: "tube5Joint", type: "Joint", relative: { x: { name: "tube", io: "5"}, y: { name: "and5outJoint" }}},
            { name: "and6outJoint", type: "Joint", y: -30, relative: { xy: { name: "decoder.and6", io: "out"}}},
            { name: "tube6Joint", type: "Joint", relative: { x: { name: "tube", io: "6"}, y: { name: "and6outJoint" }}},
            { name: "and7outJoint", type: "Joint", y: -40, relative: { xy: { name: "decoder.and7", io: "out"}}},
            { name: "tube7Joint", type: "Joint", relative: { x: { name: "tube", io: "7"}, y: { name: "and7outJoint" }}},
            { name: "and8outJoint", type: "Joint", y: -50, relative: { xy: { name: "decoder.and8", io: "out"}}},
            { name: "tube8Joint", type: "Joint", relative: { x: { name: "tube", io: "8"}, y: { name: "and8outJoint" }}},
            { name: "and9outJoint", type: "Joint", y: -60, relative: { xy: { name: "decoder.and9", io: "out"}}},
            { name: "tube9Joint", type: "Joint", relative: { x: { name: "tube", io: "9"}, y: { name: "and9outJoint" }}}
        ],
        wires: 
        [
            { name: "and0", points: [{ name: "decoder.and0", io: "out"}, { name: "and0outJoint"}, { name: "tube0Joint"}, { name: "tube", io: "0", input: 0}]},
            { name: "and1", points: [{ name: "decoder.and1", io: "out"}, { name: "and1outJoint"}, { name: "tube1Joint"}, { name: "tube", io: "1", input: 1}]},
            { name: "and2", points: [{ name: "decoder.and2", io: "out"}, { name: "and2outJoint" }, { name: "tube2Joint"}, { name: "tube", io: "2", input: 2}]},
            { name: "and3", points: [{ name: "decoder.and3", io: "out"}, { name: "and3outJoint"}, { name: "tube3Joint"}, { name: "tube", io: "3", input: 3}]}, 
            { name: "and4", points: [{ name: "decoder.and4", io: "out"}, { name: "and4outJoint"}, { name: "tube4Joint"}, { name: "tube", io: "4", input: 4}]},
            { name: "and5", points: [{ name: "decoder.and5", io: "out"}, { name: "and5outJoint"}, { name: "tube5Joint"}, { name: "tube", io: "5", input: 5}]},
            { name: "and6", points: [{ name: "decoder.and6", io: "out"}, { name: "and6outJoint"}, { name: "tube6Joint"}, { name: "tube", io: "6", input: 6}]},
            { name: "and7", points: [{ name: "decoder.and7", io: "out"}, { name: "and7outJoint"}, { name: "tube7Joint"}, { name: "tube", io: "7", input: 7}]},
            { name: "and8", points: [{ name: "decoder.and8", io: "out"}, { name: "and8outJoint"}, { name: "tube8Joint"}, { name: "tube", io: "8", input: 8}]},
            { name: "and9", points: [{ name: "decoder.and9", io: "out"}, { name: "and9outJoint"}, { name: "tube9Joint"}, { name: "tube", io: "9", input: 9}]}
        ]
}
