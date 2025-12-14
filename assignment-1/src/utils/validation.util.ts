export class ValidationUtil {
  static isValidObjectId(id: string): boolean {
    // Support both MongoDB ObjectIds and custom transaction IDs
    return /^[0-9a-fA-F]{24}$/.test(id) || /^[a-z]+[0-9]{8}[A-F0-9]{8}$/.test(id);
  }

  static sanitizeString(input: string): string {
    return input.trim();
  }

  static isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && value > 0;
  }

  static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}