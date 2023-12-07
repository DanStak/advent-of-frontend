
type ChangeTracker = (property: string, value: any) => void;
type LetterType = Record<string, any>

export function createTrackedLetter(letter: LetterType, trackerFn: ChangeTracker): LetterType {
    return new Proxy(letter, {
        set: (target, prop: string, receiver) => {
            if(target[prop] !== receiver) {
                trackerFn(prop, receiver)
            }
            target[prop] = receiver;
            return true;
        }
    }) as LetterType
}