import { Character } from "../src/characterInterface";
import { attack, attackWithNoDependencyInversion } from "../src/attack";

describe("Unit tests for attack", () => {
    const attacker: Character = {
        name: "Attacker",
        life: 100,
        attack_power: 50,
        defense: 20
    };

    const defender: Character = {
        name: "Defender",
        life: 100,
        attack_power: 40,
        defense: 30
    };

    test("Attacker and defender are valid characters", () => {
        const result = attack(attacker, defender, (character) => {
            return true;
        });

        expect(result).toBe(90);
    });

    test("Attacker and defender are invalid characters", () => {
        const result = attack(attacker, defender, (character) => {
            return false;
        });

        expect(result).toBe("Invalid Character");
    });
});

describe("Unit tests for attackWithNoDependencyInversion", () => {
    const attacker: Character = {
        name: "Attacker",
        life: 100,
        attack_power: 50,
        defense: 20
    };

    const defender: Character = {
        name: "Defender",
        life: 100,
        attack_power: 40,
        defense: 30
    };

    test("Attacker and defender are valid characters", () => {
        const result = attackWithNoDependencyInversion(attacker, defender);
        expect(result).toBe(90);
    });

    test("Attacker and defender are invalid characters", () => {
        jest.mock("./validateCharacter", () => ({
            validateCharacter: () => false
        }));

        const result = attackWithNoDependencyInversion(attacker, defender);
        expect(result).toBe("Invalid Character");
    });
});
