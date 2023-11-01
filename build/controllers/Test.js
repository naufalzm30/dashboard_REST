'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const Test_1 = __importDefault(require('../models/Test'));
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
    return Test_1.default
        .findById(testId)
        .then((test) => (test ? res.status(200).json({ test }) : res.status(404).json({ message: 'tidak ada lagu' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllTest = (req, res, next) => {
    // kalo mau return specific properties find({}, 'idTurbin,
    return (
        Test_1.default
            .aggregate([
                {
                    $group: { _id: '$Time', Kec_angin: { $avg: '$Kec_angin' } }
                },
                {
                    $sort: { _id: 1 }
                }
            ])
            // , mean_power: { $avg: '$Power' }, std_power: { $stdDevPop: '$Power' }
            .allowDiskUse(true)
            .then((tests) => res.status(200).json({ tests }))
            .catch((error) => res.status(500).json({ error }))
    );
};
const updateTest = (req, res, next) => {
    const testId = req.params.testId;
    return Test_1.default
        .findById(testId)
        .then((test) => {
            if (test) {
                test.set(req.body);
                return test
                    .save()
                    .then((test) => res.status(200).json({ test }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'tidak ada lagu' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteTest = (req, res, next) => {
    const testId = req.params.testId;
    return Test_1.default
        .findByIdAndDelete(testId)
        .then((test) =>
            test
                ? res.status(201).json({
                      message: 'lagu dihapus'
                  })
                : res.status(404).json({ message: 'tidak ada lagu' })
        )
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createTest, readTest, readAllTest, updateTest, deleteTest };
