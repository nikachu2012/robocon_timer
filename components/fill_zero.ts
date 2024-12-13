export default function fillZero(input: string, digit: number): string {
    if (input.length < digit) {
        return "0".repeat(digit - input.length) + input;
    }
    else {
        return input
    }
}
