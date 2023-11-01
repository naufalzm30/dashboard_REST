"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WRA_1 = __importDefault(require("../models/WRA"));
const createWRA = (req, res, next) => {
    const { idTurbin, idDevice, Ketinggian, Date, Time, Kec_angin, Arah_angin, Derajat_angin, Power } = req.body;
    const wra = new WRA_1.default({
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
    return wra
        .save()
        .then((wra) => res.status(200).json({ wra }))
        .catch((error) => res.status(500).json({ error }));
};
const readWRA = (req, res, next) => {
    const wraId = req.params.wraId;
    // kalo mau return specific properties findById(wraId, 'idTurbin')
    return WRA_1.default.findById(wraId)
        .then((wra) => (wra ? res.status(200).json({ wra }) : res.status(404).json({ message: 'tidak ada lagu' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllWRA = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin')
    return WRA_1.default.find({})
        .then((wras) => res.status(200).json({ wras }))
        .catch((error) => res.status(500).json({ error }));
};
const readDefaultWRA = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin')
    return WRA_1.default.aggregate([
        {
            $group: {
                _id: '$idTurbin',
                wra: {
                    $addToSet: '$idDevice'
                },
                max_date: {
                    $max: '$Date'
                }
            }
        },
        {
            $project: {
                _id: 1,
                wra: {
                    $sortArray: { input: '$wra', sortBy: 1 }
                },
                max_date: 1
            }
        }
    ])
        .then((defaultValue) => res.status(200).json({ defaultValue }))
        .catch((error) => res.status(500).json({ error }));
};
const readGrafikWRA = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin')
    const WTId = req.params.WTId;
    const wraId = req.params.wraId;
    const tanggal_awal = req.params.minDate;
    const tanggal_akhir = req.params.maxDate;
    return WRA_1.default.aggregate([
        {
            $match: {
                idTurbin: WTId,
                idDevice: wraId,
                $expr: {
                    $and: [
                        {
                            $gte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_awal, format: '%Y-%m-%d' } }]
                        },
                        {
                            $lte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_akhir, format: '%Y-%m-%d' } }]
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: {
                    $cond: {
                        if: { $eq: [tanggal_awal, tanggal_akhir] },
                        then: '$Time',
                        else: '$Date'
                    }
                },
                kec: { $avg: '$Kec_angin' },
                power: { $avg: '$Power' }
            }
        },
        {
            $sort: { _id: 1 }
        }
        // {
        //     $group: {
        //         _id: 0,
        //         kec_tampil: { $addToSet: '$kec' },
        //         max_kec: { $max: '$kec' }
        //     }
        // }
        // {
        //     $project: {
        //         Time: 1,
        //         Kec_angin: 1,
        //         Date: 1
        //     }
        // }
    ])
        .then((GrafikWRA) => res.status(200).json({ GrafikWRA }))
        .catch((error) => res.status(500).json({ error }));
};
const readStatistikWRA = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin')
    const WTId = req.params.WTId;
    const wraId = req.params.wraId;
    const tanggal_awal = req.params.minDate;
    const tanggal_akhir = req.params.maxDate;
    return WRA_1.default.aggregate([
        {
            $match: {
                idTurbin: WTId,
                idDevice: wraId,
                $expr: {
                    $and: [
                        {
                            $gte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_awal, format: '%Y-%m-%d' } }]
                        },
                        {
                            $lte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_akhir, format: '%Y-%m-%d' } }]
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: '$Arah_angin',
                max_angin: { $max: '$Kec_angin' },
                mean_angin: { $avg: '$Kec_angin' },
                std_angin: { $stdDevPop: '$Kec_angin' },
                max_power: { $max: '$Power' },
                mean_power: { $avg: '$Power' },
                std_power: { $stdDevPop: '$Power' }
            }
        }
    ])
        .then((StatistikWRA) => res.status(200).json({ StatistikWRA }))
        .catch((error) => res.status(500).json({ error }));
};
const readStatistikAllWRA = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin')
    const WTId = req.params.WTId;
    const wraId = req.params.wraId;
    const tanggal_awal = req.params.minDate;
    const tanggal_akhir = req.params.maxDate;
    return WRA_1.default.aggregate([
        {
            $match: {
                idTurbin: WTId,
                idDevice: wraId,
                $expr: {
                    $and: [
                        {
                            $gte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_awal, format: '%Y-%m-%d' } }]
                        },
                        {
                            $lte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_akhir, format: '%Y-%m-%d' } }]
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: '$idDevice',
                max_angin: { $max: '$Kec_angin' },
                mean_angin: { $avg: '$Kec_angin' },
                std_angin: { $stdDevPop: '$Kec_angin' },
                max_power: { $max: '$Power' },
                mean_power: { $avg: '$Power' },
                std_power: { $stdDevPop: '$Power' }
            }
        }
        // {
        //     $project: {
        //         _id: 1,
        //         max_angin: { $max: '$Kec_angin' }
        //     }
        // }
    ])
        .then((StatistikWRA) => res.status(200).json({ StatistikWRA }))
        .catch((error) => res.status(500).json({ error }));
};
const readDistribusiWRA = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin')
    const WTId = req.params.WTId;
    const wraId = req.params.wraId;
    const tanggal_awal = req.params.minDate;
    const tanggal_akhir = req.params.maxDate;
    return WRA_1.default.aggregate([
        {
            $match: {
                idTurbin: WTId,
                idDevice: wraId,
                $expr: {
                    $and: [
                        {
                            $gte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_awal, format: '%Y-%m-%d' } }]
                        },
                        {
                            $lte: [{ $dateFromString: { dateString: '$Date', format: '%Y-%m-%d' } }, { $dateFromString: { dateString: tanggal_akhir, format: '%Y-%m-%d' } }]
                        }
                    ]
                }
            }
        },
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
    ])
        .then((DistribusiWRA) => res.status(200).json({ DistribusiWRA }))
        .catch((error) => res.status(500).json({ error }));
};
const updateWRA = (req, res, next) => {
    const wraId = req.params.wraId;
    return WRA_1.default.findById(wraId)
        .then((wra) => {
        if (wra) {
            wra.set(req.body);
            return wra
                .save()
                .then((wra) => res.status(200).json({ wra }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'tidak ada lagu' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteWRA = (req, res, next) => {
    const wraId = req.params.wraId;
    return WRA_1.default.findByIdAndDelete(wraId)
        .then((wra) => wra
        ? res.status(201).json({
            message: 'lagu dihapus'
        })
        : res.status(404).json({ message: 'tidak ada lagu' }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createWRA, readWRA, readDefaultWRA, updateWRA, deleteWRA, readGrafikWRA, readStatistikWRA, readDistribusiWRA, readStatistikAllWRA };
