import { getMeta, getPagination } from '../../src/utils/pagination';

describe('Pagination Utilities', () => {

  describe('getMeta', () => {
    it('should return correct meta data', () => {
      const totalData = 45;
      const page = 2;
      const pageSize = 10;
      const result = getMeta(totalData, page, pageSize);
      expect(result).toEqual({
        page: 2,
        total_page: 5, 
        total_data: 45,
      });
    });

    it('should handle zero totalData', () => {
      const result = getMeta(0, 1, 10);
      expect(result.total_page).toBe(0);
    });
  });

  describe('getPagination', () => {
    it('should return correct limit and offset', () => {
      const page = 3;
      const pageSize = 20;

      const result = getPagination(page, pageSize);

      expect(result).toEqual({
        limit: 20,
        offset: 40,
      });
    });

    it('should handle page 1 correctly', () => {
      const result = getPagination(1, 15);
      expect(result.offset).toBe(0);
      expect(result.limit).toBe(15);
    });
  });

});
