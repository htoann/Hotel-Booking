export default function getFlagEmoji(countryCode: any) {
    return countryCode.toUpperCase().replace(/./g, (char: { charCodeAt: () => number; }) =>
        String.fromCodePoint(127397 + char.charCodeAt())
    );
}