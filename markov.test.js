const MarkovMachine = require('./markov');

describe("make an object of words", function () {
    let mm
    beforeAll(function () {
        mm = new MarkovMachine('cat in the hat in the hat')
    });

    test('should make an array of words', function () {
        expect(mm.words).toEqual(['cat', 'in', 'the', 'hat', 'in', 'the', 'hat']);
    });

    test('should make an object of markov words', function () {
        expect(mm.chain).toEqual({
            cat: ['in'],
            in: ['the', 'the'],
            the: ['hat', 'hat'],
            hat: ['in', undefined]
        })
    })
});

