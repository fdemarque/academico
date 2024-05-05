import { validateCharacter } from "./validateCharacter";
import { Character } from "./characterInterface";

const attack = (attacker: Character, defender: Character, validate: (character: Character) => boolean): number | string => {
    try {
        const isAttackerValid = validate(attacker);
        const isDefenderValid = validate(defender);

        if (!isAttackerValid || !isDefenderValid) {
            throw new Error("Invalid Character");
        }

        defender.life -= attacker.attack_power - defender.defense;
        return defender.life;
    } catch (error: any) {
        return error.message;
    }
}

const attackWithNoDependencyInversion = (attacker: Character, defender: Character): number | string => {
    try {
        const isAttackerValid = validateCharacter(attacker);
        const isDefenderValid = validateCharacter(defender);

        if (!isAttackerValid || !isDefenderValid) {
            throw new Error("Invalid Character");
        }

        defender.life -= attacker.attack_power - defender.defense;
        return defender.life;
    } catch (error: any) {
        return error.message;
    }
}

export { attack, attackWithNoDependencyInversion };
