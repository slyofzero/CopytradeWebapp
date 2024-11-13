import blockies from "ethereum-blockies";

export function roundUpToDecimalPlace(
  number: string | number | undefined,
  decimalPlaces: number
) {
  number = Number(number || 0);

  const factor = 10 ** decimalPlaces;
  return Math.ceil(number * factor) / factor;
}

export function generateProfilePicture(ethereumAddress: string) {
  // Generate the icon
  const icon = blockies.create({
    seed: ethereumAddress.toLowerCase(), // Convert to lowercase for consistency
    size: 8, // Size of the icon in blocks
    scale: 16, // Scaling factor
  });

  // Convert to an image URL
  return icon.toDataURL();
}
