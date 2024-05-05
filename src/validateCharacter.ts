import { Character } from "./characterInterface";

const validateCharacter = (character: Character): boolean => {
    if (!character.name || !character.life || !character.attack_power || !character.defense) {
        return false;
    }

    const isValid = Object.values(character).every(property => {
        if (typeof property === 'number') {
            return property > 0;
        } else if (typeof property === 'string') {
            return property.trim() !== '';
        } else {
            return true;
        }
    });

    return isValid;
};

export { validateCharacter };
