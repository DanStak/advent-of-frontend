const HASH_KEY = 'KID_'

interface Kid {
    id: number,
    gifts: Map<string, string>
}

const constructHashKey = (id: number) => `${HASH_KEY}${id}`

export class GiftRegistry {
    private list = new Map<string, Kid>()

    private getKidFromList(kidID: number): Kid {
        const kidHash = constructHashKey(kidID);
        return {...this.list.get(kidHash) || {id: kidID, gifts: new Map<string, string>()}};
    }

    private saveKid(kid: Kid) {
        const kidHash = constructHashKey(kid.id)
        this.list.set(kidHash, kid);
    }

    addGift(kidID: number, giftName: string) {
        const searchedKid = this.getKidFromList(kidID);

        searchedKid.gifts.set(giftName, giftName);

        this.saveKid(searchedKid)
    }

    getGiftsForChild(kidID: number) {
        const searchedKid = this.getKidFromList(kidID);
        
        return Array.from(searchedKid.gifts.values());
    }

    removeGift(kidID: number, giftName: string) {
        const searchedKid = this.getKidFromList(kidID);
        
        if(!searchedKid.gifts.has(giftName)) throw Error('Gift not found');

        searchedKid.gifts.delete(giftName)
        
    }
}