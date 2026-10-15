import {
    findChord,
    getTransitionScore,
    optimizeProgression
} from './progressionOptimizer';

const position = (frets, fingers, extra = {}) => ({
    frets,
    fingers,
    baseFret: 1,
    barres: [],
    midi: [60],
    ...extra
});

describe('progression optimizer', () => {
    test('chooses a globally minimal path instead of the easiest first shape', () => {
        const db = {
            chords: {
                C: [{
                    key: 'C',
                    suffix: 'major',
                    positions: [
                        position([1, 1, 1, 1], [1, 1, 1, 1]),
                        position([5, 5, 5, 5], [1, 1, 1, 1])
                    ]
                }],
                D: [{
                    key: 'D',
                    suffix: 'major',
                    positions: [
                        position([1, 1, 1, 1], [1, 1, 1, 1]),
                        position([5, 5, 5, 5], [1, 1, 1, 1])
                    ]
                }],
                E: [{
                    key: 'E',
                    suffix: 'major',
                    positions: [
                        position([5, 5, 5, 5], [1, 1, 1, 1])
                    ]
                }]
            }
        };

        const result = optimizeProgression([
            { key: 'C', suffix: 'major' },
            { key: 'D', suffix: 'major' },
            { key: 'E', suffix: 'major' }
        ], db);

        expect(result.steps.map(step => step.positionIndex)).toEqual([1, 1, 0]);
    });

    test('scores open strings, barres, capo changes, and finger movement', () => {
        const open = position([0, 2, 1, 3], [0, 2, 1, 3]);
        const barred = position([1, 1, 1, 3], [1, 1, 1, 4], { barres: [1], capo: true });
        const moved = position([3, 2, 1, 2], [4, 2, 1, 3]);

        expect(getTransitionScore(open, barred)).toBeGreaterThan(0);
        expect(getTransitionScore(barred, moved)).toBeGreaterThan(0);
        expect(getTransitionScore(moved, moved)).toEqual(0);
    });

    test('does not mutate source DB positions', () => {
        const db = {
            chords: {
                C: [{
                    key: 'C',
                    suffix: 'major',
                    positions: [position([1, 2, 3, 4], [1, 2, 3, 4])]
                }]
            }
        };
        const before = JSON.stringify(db);

        optimizeProgression([{ key: 'C', suffix: 'major' }], db);

        expect(JSON.stringify(db)).toEqual(before);
    });

    test('finds chord data by key and canonical suffix', () => {
        const db = {
            chords: {
                C: [{ key: 'C', suffix: 'm7b5', positions: [] }]
            }
        };

        expect(findChord(db, 'C', 'm7b5')).toEqual(db.chords.C[0]);
    });

    test('keeps a manual shape fixed while optimizing automatic steps around it', () => {
        const db = {
            chords: {
                C: [{
                    key: 'C',
                    suffix: 'major',
                    positions: [
                        position([1, 1, 1, 1], [1, 1, 1, 1]),
                        position([5, 5, 5, 5], [1, 1, 1, 1])
                    ]
                }],
                D: [{
                    key: 'D',
                    suffix: 'major',
                    positions: [
                        position([1, 1, 1, 1], [1, 1, 1, 1]),
                        position([5, 5, 5, 5], [1, 1, 1, 1])
                    ]
                }],
                E: [{
                    key: 'E',
                    suffix: 'major',
                    positions: [
                        position([1, 1, 1, 1], [1, 1, 1, 1]),
                        position([5, 5, 5, 5], [1, 1, 1, 1])
                    ]
                }]
            }
        };

        const result = optimizeProgression([
            { key: 'C', suffix: 'major' },
            { key: 'D', suffix: 'major', positionIndex: 1 },
            { key: 'E', suffix: 'major' }
        ], db);

        expect(result.steps.map(step => step.positionIndex)).toEqual([1, 1, 1]);
    });

    test('treats an invalid manual shape index as automatic', () => {
        const db = {
            chords: {
                C: [{
                    key: 'C',
                    suffix: 'major',
                    positions: [position([1, 1, 1, 1], [1, 1, 1, 1])]
                }]
            }
        };

        const result = optimizeProgression([
            { key: 'C', suffix: 'major', positionIndex: 99 }
        ], db);

        expect(result.steps).toHaveLength(1);
        expect(result.steps[0].positionIndex).toBe(0);
    });
});
