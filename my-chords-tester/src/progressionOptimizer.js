const DEFAULT_SHAPE_WEIGHT = 0.08;

const getAbsoluteFrets = (position) => {
    const baseFret = position.baseFret || 1;

    return position.frets.map(fret => {
        if (fret <= 0) {
            return fret;
        }

        return baseFret + fret - 1;
    });
};

const getFingerAnchors = (position) => {
    const absoluteFrets = getAbsoluteFrets(position);
    const anchors = {};

    position.fingers.forEach((finger, stringIndex) => {
        const fret = absoluteFrets[stringIndex];

        if (finger <= 0 || fret <= 0) {
            return;
        }

        if (!anchors[finger]) {
            anchors[finger] = [];
        }

        anchors[finger].push({ fret, stringIndex });
    });

    return Object.fromEntries(
        Object.entries(anchors).map(([finger, points]) => {
            const fret = points.reduce((sum, point) => sum + point.fret, 0) / points.length;
            const stringIndex = points.reduce((sum, point) => sum + point.stringIndex, 0) / points.length;

            return [finger, { fret, stringIndex }];
        })
    );
};

export const getShapeComplexity = (position) => {
    const absoluteFrets = getAbsoluteFrets(position).filter(fret => fret > 0);

    if (absoluteFrets.length === 0) {
        return 0;
    }

    const minFret = Math.min(...absoluteFrets);
    const maxFret = Math.max(...absoluteFrets);
    const fingerCount = new Set(position.fingers.filter(finger => finger > 0)).size;
    const barreCount = Array.isArray(position.barres) ? position.barres.length : (position.barres ? 1 : 0);

    return (
        (maxFret - minFret) * 1.5 +
        minFret * 0.25 +
        fingerCount * 0.4 +
        barreCount * 1.25 +
        (position.capo ? 0.75 : 0)
    );
};

export const getTransitionScore = (fromPosition, toPosition) => {
    if (!fromPosition || !toPosition) {
        return 0;
    }

    const fromAnchors = getFingerAnchors(fromPosition);
    const toAnchors = getFingerAnchors(toPosition);
    const fingers = new Set([...Object.keys(fromAnchors), ...Object.keys(toAnchors)]);
    const fromFrets = getAbsoluteFrets(fromPosition);
    const toFrets = getAbsoluteFrets(toPosition);
    const fromBarres = Array.isArray(fromPosition.barres) ? fromPosition.barres : (fromPosition.barres ? [fromPosition.barres] : []);
    const toBarres = Array.isArray(toPosition.barres) ? toPosition.barres : (toPosition.barres ? [toPosition.barres] : []);

    let score = 0;

    fingers.forEach(finger => {
        const from = fromAnchors[finger];
        const to = toAnchors[finger];

        if (!from || !to) {
            score += 7;
            return;
        }

        score += Math.abs(from.fret - to.fret) * 4;
        score += Math.abs(from.stringIndex - to.stringIndex) * 1.5;
    });

    score += fromFrets.reduce((sum, fret, index) => {
        const toFret = toFrets[index];

        if (fret <= 0 || toFret <= 0) {
            return sum + (fret === toFret ? 0 : 1.5);
        }

        return sum + Math.abs(fret - toFret) * 0.35;
    }, 0);

    if (fromBarres.length !== toBarres.length || Boolean(fromPosition.capo) !== Boolean(toPosition.capo)) {
        score += 2;
    }

    return score;
};

export const findChord = (chordDb, key, suffix) =>
    (chordDb.chords[key] || []).find(chord => chord.suffix === suffix);

const getPositionCandidates = (step) => {
    const positions = step.chord.positions;
    const selectedIndex = step.positionIndex;

    if (Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex < positions.length) {
        return [{ position: positions[selectedIndex], positionIndex: selectedIndex }];
    }

    return positions.map((position, positionIndex) => ({ position, positionIndex }));
};

export const optimizeProgression = (progression, chordDb, options = {}) => {
    const shapeWeight = options.shapeWeight === undefined ? DEFAULT_SHAPE_WEIGHT : options.shapeWeight;
    const chordSteps = progression.map(item => ({
        ...item,
        chord: findChord(chordDb, item.key, item.suffix)
    }));

    if (chordSteps.some(step => !step.chord || !step.chord.positions.length)) {
        return {
            totalScore: 0,
            steps: [],
            transitions: [],
            missing: chordSteps.filter(step => !step.chord || !step.chord.positions.length)
        };
    }

    let states = getPositionCandidates(chordSteps[0]).map(({ position, positionIndex }) => ({
        score: getShapeComplexity(position) * shapeWeight,
        path: [{
            ...chordSteps[0],
            position,
            positionIndex,
            movementScore: 0
        }],
        transitions: []
    }));

    chordSteps.slice(1).forEach(step => {
        states = getPositionCandidates(step).map(({ position, positionIndex }) => {
            const candidates = states.map(state => {
                const previous = state.path[state.path.length - 1].position;
                const movementScore = getTransitionScore(previous, position);
                const score = state.score + movementScore + getShapeComplexity(position) * shapeWeight;

                return {
                    score,
                    path: state.path.concat({
                        ...step,
                        position,
                        positionIndex,
                        movementScore
                    }),
                    transitions: state.transitions.concat(movementScore)
                };
            });

            return candidates.reduce((best, candidate) => candidate.score < best.score ? candidate : best);
        });
    });

    const best = states.reduce((currentBest, state) => state.score < currentBest.score ? state : currentBest);

    return {
        totalScore: best.score,
        steps: best.path,
        transitions: best.transitions,
        missing: []
    };
};
