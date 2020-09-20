export class MayBe {
    constructor(val) {
        this.value = val;
    }

    static of(value) {
        return new MayBe(value);
    }

    get isNothing() {
        return this.value === null || this.value === undefined;
    }

    map(fn) {
        return this.isNothing ? MayBe.of(null) : MayBe.of(fn(this.value));
    }
}

MayBe.of("string").map(x => x.toUpperCase());

MayBe.of("George")
    .map(x => x.toUpperCase())
    .map(x => `Mr. ${x}`);

MayBe.of("George")
    .map(() => undefined)
    .map(x => `Mr. ${x}`);
