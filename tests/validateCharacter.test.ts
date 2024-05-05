import { validateCharacter } from "../src/validateCharacter";

describe("Unit test validateCharacter", () => {
    
    test("Character with empty name", () => {
        const character = {
            name: "",
            life: 100,
            attack_power: 100,
            defense: 100
        };
        const isValid = validateCharacter(character);
        expect(isValid).toBeFalsy();
    });

    test("Character with zero life", () => {
        const character = {
            name: "<NAME>",
            life: 0,
            attack_power: 100,
            defense: 100
        };
        const isValid = validateCharacter(character);
        expect(isValid).toBeFalsy();
    });

    test("Character with zero attack power", () => {
        const character = {
            name: "<NAME>",
            life: 100,
            attack_power: 0,
            defense: 100
        };
        const isValid = validateCharacter(character);
        expect(isValid).toBeFalsy();
    });

    test("Character with zero defense", () => {
        const character = {
            name: "<NAME>",
            life: 100,
            attack_power: 100,
            defense: 0
        };
        const isValid = validateCharacter(character);
        expect(isValid).toBeFalsy();
    });

    test("Character with negative life, attack power, or defense", () => {
        const character = {
            name: "<NAME>",
            life: -100,
            attack_power: 100,
            defense: 100
        };
        const isValid = validateCharacter(character);
        expect(isValid).toBeFalsy();
    });

    test("Character with valid information", () => {
        const character = {
            name: "<NAME>",
            life: 100,
            attack_power: 100,
            defense: 100
        };
        const isValid = validateCharacter(character);
        expect(isValid).toBeTruthy();
    });
});
