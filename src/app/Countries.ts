
export class ICountries {
    name: string
    sick: number
    healed: number
    dead: number

    constructor(name, sick, healed, dead) {
        this.name = name;
        this.sick = sick;
        this.healed = healed;
        this.dead = dead;
    }
}


