function classifyTriangle(a, b, c) {
    // Check input conditions C1, C2, and C3
    if (a < 1 || a > 200 || b < 1 || b > 200 || c < 1 || c > 200) {
        return "Error: Input conditions C1, C2, or C3 failed.";
    }

    // Check conditions C4, C5, and C6 to determine if it's a valid triangle
    if (a >= b + c || b >= a + c || c >= a + b) {
        return "Not a Triangle";
    }

    // Classification based on side equality
    if (a === b && b === c) {
        return "Equilateral";
    } else if (a === b || a === c || b === c) {
        return "Isosceles";
    } else {
        return "Scalene";
    }
}

module.exports = {classifyTriangle} ;