"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Test_1 = __importDefault(require("../models/Test"));
const createTest = (req, res, next) => {
    const { idTurbin, idDevice, Ketinggian, Date, Time, Kec_angin, Arah_angin, Derajat_angin, Power } = req.body;
    const test = new Test_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        idTurbin,
        idDevice,
        Ketinggian,
        Date,
        Time,
        Kec_angin,
        Arah_angin,
        Derajat_angin,
        Power
    });
    return test
        .save()
        .then((test) => res.status(200).json({ test }))
        .catch((error) => res.status(500).json({ error }));
};
const readTest = (req, res, next) => {
    const testId = req.params.testId;
    // kalo mau return specific properties findById(testId, 'idTurbin,
    return Test_1.default.findById(testId)
        .then((test) => (test ? res.status(200).json({ test }) : res.status(404).json({ message: 'tidak ada lagu' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllTest = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin,
    let hehe = Test_1.default.aggregate([
        {
            $group: {
                // _id: '$Arah_angin',
                // count: { $count: {} }
                _id: '$Arah_angin',
                kec_0_2: {
                    $push: {
                        $cond: { if: { $and: [{ $gte: ['$Kec_angin', 0] }, { $lt: ['$Kec_angin', 2] }] }, then: '$Kec_angin', else: '$$REMOVE' }
                    }
                },
                kec_2_4: {
                    $push: {
                        $cond: { if: { $and: [{ $gte: ['$Kec_angin', 2] }, { $lt: ['$Kec_angin', 4] }] }, then: '$Kec_angin', else: '$$REMOVE' }
                    }
                },
                kec_4_6: {
                    $push: {
                        $cond: { if: { $and: [{ $gte: ['$Kec_angin', 4] }, { $lt: ['$Kec_angin', 6] }] }, then: '$Kec_angin', else: '$$REMOVE' }
                    }
                },
                kec_6_8: {
                    $push: {
                        $cond: { if: { $and: [{ $gte: ['$Kec_angin', 6] }, { $lt: ['$Kec_angin', 8] }] }, then: '$Kec_angin', else: '$$REMOVE' }
                    }
                },
                kec_8_10: {
                    $push: {
                        $cond: { if: { $and: [{ $gte: ['$Kec_angin', 8] }, { $lt: ['$Kec_angin', 10] }] }, then: '$Kec_angin', else: '$$REMOVE' }
                    }
                },
                kec_diatas_10: {
                    $push: {
                        $cond: { if: { $gte: ['$Kec_angin', 10] }, then: '$Kec_angin', else: '$$REMOVE' }
                    }
                },
                kec_total: { $count: {} }
            }
        },
        {
            $project: {
                _id: 1,
                kec_0_2: { $cond: { if: { $isArray: '$kec_0_2' }, then: { $size: '$kec_0_2' }, else: 'NA' } },
                kec_2_4: { $cond: { if: { $isArray: '$kec_2_4' }, then: { $size: '$kec_2_4' }, else: 'NA' } },
                kec_4_6: { $cond: { if: { $isArray: '$kec_4_6' }, then: { $size: '$kec_4_6' }, else: 'NA' } },
                kec_6_8: { $cond: { if: { $isArray: '$kec_6_8' }, then: { $size: '$kec_6_8' }, else: 'NA' } },
                kec_8_10: { $cond: { if: { $isArray: '$kec_8_10' }, then: { $size: '$kec_8_10' }, else: 'NA' } },
                kec_diatas_10: { $cond: { if: { $isArray: '$kec_diatas_10' }, then: { $size: '$kec_diatas_10' }, else: 'NA' } },
                kec_total: 1
            }
        }
        // {
        //     $group: {
        //         // _id: '$Arah_angin',
        //         // count: { $count: {} }
        //         _id: '$_id.Arah_angin',
        //         kec_0_2: {
        //             $push: {
        //                 tipo: '$_id.kec_angin',
        //                 total: '$total'
        //             }
        //         }
        //     }
        // }
        // {
        //     $match: { $and: [{ Kec_angin: { $gte: 0 } }, { Kec_angin: { $lt: 2 } }] }
        // }
        // {
        //     $project: {
        //         Arah_angin: 1,
        //         kec_0_2: {
        //             // Set to 1 if value < 10
        //             $cond: {
        //                 if: {
        //                     $and: [{ $gte: 0 }, { $lt: 2 }]
        //                 },
        //                 // Kec_angin: { $gte: 0, $lt: 2 }
        //                 //
        //                 then: 1,
        //                 else: 0
        //             }
        //         }
        //     }
        // },
        // {
        //     $group: {
        //         _id: '$Arah_angin',
        //         kec_0_2: { $sum: '$kec_0_2' }
        //     }
        // }
        // {
        // $group: {
        //     _id: '$Arah_angin',
        //     // kec: { $count: '$Kec_angin' }
        //     mean_angin: { $avg: '$Kec_angin' },
        //     std_angin: { $stdDevPop: '$Kec_angin' }
        // }
        // $group: {
        //     _id: {
        //         angin: '$Arah_angin'
        // kec_angin: {
        //     $cond: {
        // if: {
        //     $and: [{ $gte: ['$Kec_angin', 0] }, { $lt: ['$kec_angin', 2] }]
        // },
        //         then: '$Kec_angin',
        //         else: null
        //     }
        // }
        // },
        // kecCount_0_2:
        //  {
        //     $sum: 1
        //     // $and: [{ $gte: ['$Kec_angin', 0] }, { $lt: ['$kec_angin', 2] }]
        // }
        // {
        //     $count: {
        //         $cond: {
        //             if: {
        //                 $and: [{ $gte: ['$Kec_angin', 0] }, { $lt: ['$kec_angin', 2] }]
        //             },
        //             then: '$Kec_angin',
        //             else: 0
        //         }
        //     }
        // }
        // }
        // }
    ])
        .allowDiskUse(true)
        .exec();
    // function (test) {
    //    return hehe.res.status(200).json({ test, count: hehe.hasOwnProperty('tests') })
    // }
    // return console.log(hehe);
    return hehe.then((tests) => res.status(200).json({ tests })).catch((error) => res.status(500).json({ error }));
};
const updateTest = (req, res, next) => {
    const testId = req.params.testId;
    return Test_1.default.findById(testId)
        .then((test) => {
        if (test) {
            test.set(req.body);
            return test
                .save()
                .then((test) => res.status(200).json({ test }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'tidak ada lagu' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteTest = (req, res, next) => {
    const testId = req.params.testId;
    return Test_1.default.findByIdAndDelete(testId)
        .then((test) => test
        ? res.status(201).json({
            message: 'lagu dihapus'
        })
        : res.status(404).json({ message: 'tidak ada lagu' }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createTest, readTest, readAllTest, updateTest, deleteTest };
