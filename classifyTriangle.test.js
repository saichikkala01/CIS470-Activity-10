
const  {classifyTriangle}  = require('./classifyTriangle');

describe('classifyTriangle: Required input conditions -  See readme for more details', () => {
    test('should classify an Equilateral triangle', () => {
      expect(classifyTriangle(10, 10, 10)).toBe('Equilateral');
      // add more test cases based on your requirements and Boundary Value Analysis + Equivalence Partitioning
    });
  
    test('should classify an Isosceles triangle', () => {
      expect(classifyTriangle(10, 10, 5)).toBe('Isosceles');
    // add more test cases based on your requirements and Boundary Value Analysis + Equivalence Partitioning
    });
  
    test('should classify a Scalene triangle', () => {
      expect(classifyTriangle(10, 12, 14)).toBe('Scalene');
      // add more test cases based on your requirements and Boundary Value Analysis + Equivalence Partitioning
    });

  
    test('should return error for invalid inputs', () => {
      expect(classifyTriangle(0, 10, 10)).toBe('Error: Input conditions C1, C2, or C3 failed.');
        // add more test cases based on your requirements and Boundary Value Analysis + Equivalence Partitioning
    });
  
    test('should return "Not a Triangle" for invalid triangle sides', () => {
      expect(classifyTriangle(1, 2, 3)).toBe('Not a Triangle');
      // add more test cases based on your requirements and Boundary Value Analysis + Equivalence Partitioning
    });
  });
  