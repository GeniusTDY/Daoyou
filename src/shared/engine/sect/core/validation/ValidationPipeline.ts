export interface ValidationRule<T> {
  validate(value: T): void;
}


export class ValidationPipeline<T> {
  constructor(private readonly rules: readonly ValidationRule<T>[]) {}

  validate(value: T): void {
    for (const rule of this.rules) rule.validate(value);
  }
}
