export class EitherMonad {
    constructor (val) {
        this.value = val;
    }
    static nothing (value) {
        return new Nothing(value);
    }

    static some(value) {
        return new Some(value);
    }
}

class Nothing extends EitherMonad {
    get isNothing() {
        return true;
    }

    get isSome() {
        return false;
    }

    map(fn) {
        return this;
    }

    join() {
        return this;
    }

    chain() {
        return this;
    }
}

class Some extends EitherMonad {
    get isNothing() {
        return false;
    }

    get isSome() {
        return true;
    }
    map(fn) {
        return Some.some(fn(this.value));
    }
    join() {
        return this.value;
    }
    chain(fn) {
        return fn(this.value);
    }
}
