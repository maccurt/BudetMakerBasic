import { NumericInputDirective } from './numeric-input.directive';

describe('NumericInputDirective', () => {
  it('should create an instance', () => {
    const directive = new NumericInputDirective(null, null);
    expect(directive).toBeTruthy();
  });

  describe('checkNumericKey', () => {
    const directive = new NumericInputDirective(null, null);

    it('allowNegative = false false, allowDecimal = false', () => {

      //Allow
      expect(directive.checkNumericKey(false, false, '1')).toBeTruthy();
      expect(directive.checkNumericKey(false, false, '9')).toBeTruthy();

      //Don't Allow
      expect(directive.checkNumericKey(false, false, '.')).toBeFalsy();
      expect(directive.checkNumericKey(false, false, '-')).toBeFalsy();
      expect(directive.checkNumericKey(false, false, 'A')).toBeFalsy();
      expect(directive.checkNumericKey(false, false, 'Z')).toBeFalsy();

    });

    it('allowNegative = false false, allowDecimal = true', () => {

      //Allow
      expect(directive.checkNumericKey(false, true, '1')).toBeTruthy();
      expect(directive.checkNumericKey(false, true, '.')).toBeTruthy();

      //Don't Allow
      expect(directive.checkNumericKey(false, true, '-')).toBeFalsy();
      expect(directive.checkNumericKey(false, true, 'A')).toBeFalsy();
      expect(directive.checkNumericKey(false, true, 'Z')).toBeFalsy();

    });

    it('allowNegative = true, allowDecimal = true', () => {

      //Allow
      expect(directive.checkNumericKey(true, true, '1')).toBeTruthy();
      expect(directive.checkNumericKey(true, true, '.')).toBeTruthy();
      expect(directive.checkNumericKey(true, true, '-')).toBeTruthy();
      //Don't Allow

      expect(directive.checkNumericKey(true, true, 'A')).toBeFalsy();
      expect(directive.checkNumericKey(true, true, 'Z')).toBeFalsy();

    });
  });

  // describe('getPattern', () => {
  //   const directive = new NumericInputDirective(null);
  //   it('no deciamsl should return the correct pattern', () => {
  //     directive.decimals = 0;
  //     directive.min = 0
  //     const pattern = directive.getPattern();
  //     expect(pattern).toEqual(/[0-9\ ]/)
  //   });

  //   it('allowNegative false allowDecimalPrecision true', () => {
  //     const regex = directive.getPattern(false, true);
  //     console.log(regex)

  //     expect(regex.test('1.20')).toBeTruthy();
  //     expect(regex.test('.20')).toBeTruthy();
  //     expect(regex.test('4')).toBeTruthy();

  //     expect(regex.test('-1.20')).toBeFalsy();
  //     expect(regex.test('-.20')).toBeFalsy();
  //     expect(regex.test('-.20')).toBeFalsy();

  //   });

  //   it('allowNegative and allowDecimalPrecision', () => {
  //     //const regex = new RegExp(/^-?[0-9]?\d*(\.\d+)?$/)      
  //     const regex = directive.getPattern(true, true);

  //     //Can enter
  //     expect(regex.test('-1.20')).toBeTruthy();
  //     expect(regex.test('1.20')).toBeTruthy();
  //     expect(regex.test('.20')).toBeTruthy();
  //     expect(regex.test('-.20')).toBeTruthy();
  //     expect(regex.test('-.20')).toBeTruthy();
  //     expect(regex.test('4')).toBeTruthy();

  //     //Can not enter
  //     expect(regex.test('4..')).toBeFalsy()
  //     expect(regex.test('.4..')).toBeFalsy()      
  //     expect(regex.test('-4.')).toBeFalsy()      

  //     //expect(regex.test('.')).toBeFalsy()

  //   });

  // });
});
