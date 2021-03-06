import '../misc';
import { compile } from 'handlebars';
import * as datetime from '../../src/helpers/datetime';

describe('datetime', () => {

  describe('formatDate', () => {
    it('should return formatted date (MM/DD/YYYY) even if date is not provided', () => {
      expect(datetime.formatDate('MM/DD/YYYY')).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });

    it('should return formatted date (YYYY-MM-DD) even if date is not provided', () => {
      expect(datetime.formatDate('YYYY-MM-DD')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should return formatted date (YYYY-MM-DD) even if date=null is provided', () => {
      expect(datetime.formatDate('YYYY-MM-DD', null)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should return formatted date (YYYY-MM-DD) even if date=undefined is provided', () => {
      expect(datetime.formatDate('YYYY-MM-DD', undefined)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should return use the current date if no date is provided', () => {
      const expected = datetime.formatDate('YYYY-MM-DD', new Date());

      expect(datetime.formatDate('YYYY-MM-DD')).toEqual(expected);
    });

    it('should return formatted date if date is provided', () => {
      const actual = '01/02/2016';
      const expected = '2016-01-02';

      expect(datetime.formatDate('YYYY-MM-DD', new Date(actual))).toEqual(expected);
    });

    it('should still work and return the full timestamp if no parameters are provided', () => {
      expect(datetime.formatDate()).toMatch(/^\d{4}-\d{2}-\d{2}.+$/);
    });

    it('helper should work as expected after compilation', () => {
      const actual = '01/02/2016';
      const expected = '2016-01-02';
      const template = compile('{{formatDate "YYYY-MM-DD" date}}');

      expect(template({
        date: new Date(actual)
      })).toEqual(expected);
    });

    it('helper should work as expected after compilation with no parameters', () => {
      const template = compile('{{formatDate}}');

      expect(template()).toMatch(/^\d{4}-\d{2}-\d{2}.+$/);
    });

    it('helper after compilation should return the current Date if no date is provided', () => {
      const expected = datetime.formatDate('YYYY-MM-DD', new Date());

      expect(datetime.formatDate('YYYY-MM-DD')).toEqual(expected);
    });
  });

});
