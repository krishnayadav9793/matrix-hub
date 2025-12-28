export const def=[
  {
    "category": "I. Fundamental Concepts & Notation",
    "definitions": [
      {
        "term": "Definition of a Matrix",
        "description": "A matrix is simply a rectangular arrangement or 'grid' of numbers, symbols, or expressions arranged in rows and columns. We use matrices to organize data efficiently, similar to how a spreadsheet works. They are fundamental tools in mathematics used to solve systems of linear equations, transform geometric shapes, and handle large datasets in computer science.",
        "example": "A matrix 'A' with 2 rows and 3 columns looks like:\n[ 1  2  3 ]\n[ 4  5  6 ]"
      },
      {
        "term": "Elements/Entries (Row and Column Indices)",
        "description": "The individual items inside a matrix are called elements or entries. Each element has a specific address based on its location, defined by its row number and column number. We usually denote an element as 'a_ij', where 'i' tells you which row it is in, and 'j' tells you which column it is in.",
        "example": "In the matrix [[10, 20], [30, 40]], the element at row 1, column 2 (a_12) is 20."
      },
      {
        "term": "Order/Dimension of a Matrix (m x n)",
        "description": "The order or dimension of a matrix tells you its size. It is written as 'm x n' (read as 'm by n'), where 'm' is the number of rows (horizontal lines) and 'n' is the number of columns (vertical lines). Knowing the dimension is crucial for determining if two matrices can be added or multiplied.",
        "example": "A matrix with 3 rows and 2 columns has an order of 3x2."
      },
      {
        "term": "General Representation ([A]ij)",
        "description": "This is the mathematical shorthand for writing a matrix. Instead of writing out the whole grid, mathematicians write A = [a_ij]. It implies a matrix named A is made up of elements 'a' positioned at row 'i' and column 'j'.",
        "example": "A = [a_ij] where m=2, n=2 represents a 2x2 generic matrix."
      },
      {
        "term": "Equality of Matrices",
        "description": "Two matrices are considered equal if and only if they meet two strict conditions: first, they must have the exact same dimensions (order), and second, every single corresponding element must be identical. If even one number is different, or the shapes are different, they are not equal.",
        "example": "Matrix A = [[1, 2], [3, 4]] is equal to Matrix B = [[1, 2], [3, 4]]. It is NOT equal to [[1, 2], [3, 5]]."
      }
    ]
  },
  {
    "category": "II. Types and Classifications",
    "definitions": [
      {
        "term": "Row Matrix (Row Vector)",
        "description": "A row matrix is a matrix that consists of only a single row. It can have as many columns as needed, but the vertical height is always just 1. In physics and computer science, this is often called a row vector.",
        "example": "[ 5, 2, 9, 1 ] is a 1x4 row matrix."
      },
      {
        "term": "Column Matrix (Column Vector)",
        "description": "A column matrix consists of only a single column. It stands upright. It can have many rows, but the width is always just 1. This is the standard way to represent vectors in linear algebra.",
        "example": "[[1], [5], [9]] is a 3x1 column matrix."
      },
      {
        "term": "Rectangular Matrix",
        "description": "A rectangular matrix is the most general type of matrix where the number of rows does not equal the number of columns. The shape looks like a rectangle rather than a square.",
        "example": "A 2x4 matrix is rectangular because 2 is not equal to 4."
      },
      {
        "term": "Square Matrix",
        "description": "A square matrix is a matrix where the number of rows is exactly equal to the number of columns (m = n). These are very special in mathematics because only square matrices have determinants and can be invertible.",
        "example": "A 3x3 matrix is a square matrix."
      },
      {
        "term": "Zero (Null) Matrix",
        "description": "A zero matrix is a matrix where every single element is the number 0. It acts like the number zero in normal arithmetic; if you add it to another matrix, that matrix doesn't change.",
        "example": "[[0, 0], [0, 0]] is a 2x2 zero matrix."
      },
      {
        "term": "Diagonal Matrix",
        "description": "A diagonal matrix is a square matrix where all the elements outside of the main diagonal are zero. The main diagonal runs from the top-left corner to the bottom-right corner. The numbers on the diagonal can be anything, but everything else must be zero.",
        "example": "[[4, 0, 0], [0, 9, 0], [0, 0, 2]]"
      },
      {
        "term": "Scalar Matrix",
        "description": "A scalar matrix is a specific type of diagonal matrix where all the numbers on the main diagonal are the exact same value. It basically scales a vector by that value.",
        "example": "[[3, 0, 0], [0, 3, 0], [0, 0, 3]] is a scalar matrix."
      },
      {
        "term": "Identity (Unit) Matrix",
        "description": "The identity matrix is the matrix equivalent of the number '1'. It is a diagonal matrix where every element on the main diagonal is 1, and everything else is 0. If you multiply any matrix by the Identity matrix, the original matrix remains unchanged.",
        "example": "I = [[1, 0], [0, 1]]"
      },
      {
        "term": "Upper Triangular Matrix",
        "description": "In an upper triangular matrix, all the entries below the main diagonal are zero. The non-zero numbers are bunched into the upper-right triangle of the grid.",
        "example": "[[1, 2, 3], [0, 4, 5], [0, 0, 6]]"
      },
      {
        "term": "Lower Triangular Matrix",
        "description": "In a lower triangular matrix, all the entries above the main diagonal are zero. The non-zero numbers form a triangle in the bottom-left corner.",
        "example": "[[1, 0, 0], [2, 3, 0], [4, 5, 6]]"
      },
      {
        "term": "Strictly Triangular Matrix",
        "description": "A strictly triangular matrix is like a standard triangular matrix, but with one extra rule: the main diagonal elements must also be zero.",
        "example": "Strictly Upper: [[0, 2, 3], [0, 0, 5], [0, 0, 0]]"
      },
      {
        "term": "Tridiagonal Matrix",
        "description": "A tridiagonal matrix has non-zero elements only on the main diagonal, the diagonal immediately above it, and the diagonal immediately below it. It looks like a thick band of numbers running down the middle.",
        "example": "[[1, 2, 0], [3, 4, 5], [0, 6, 7]]"
      }
    ]
  },
  {
    "category": "III. Matrix Arithmetic & Operations",
    "definitions": [
      {
        "term": "Matrix Addition and Subtraction",
        "description": "You can add or subtract two matrices by adding or subtracting the numbers that sit in the exact same positions. However, you can only do this if both matrices have the exact same dimension.",
        "example": "[[1, 2]] + [[3, 4]] = [[1+3, 2+4]] = [[4, 6]]"
      },
      {
        "term": "Scalar Multiplication",
        "description": "This involves multiplying a single regular number (a scalar) by an entire matrix. You simply multiply every single element inside the matrix by that scalar number.",
        "example": "2 * [[1, 2], [3, 4]] = [[2, 4], [6, 8]]"
      },
      {
        "term": "Matrix Multiplication (Row-by-Column Rule)",
        "description": "Multiplying two matrices is more complex. You take the ROW of the first matrix and multiply it by the COLUMN of the second matrix, summing the results. This is often called the 'dot product' of rows and columns. The number of columns in the first matrix must match the number of rows in the second.",
        "example": "If A is 1x2 and B is 2x1, A*B results in a 1x1 matrix."
      },
      {
        "term": "Pre-multiplication vs. Post-multiplication",
        "description": "Because order matters in matrix multiplication, we distinguish between multiplying 'A' by 'B'. Pre-multiplication means calculating A*B (A comes before B). Post-multiplication means calculating B*A (A comes after B). Usually, these produce different results.",
        "example": "In A*B, A is pre-multiplying B."
      },
      {
        "term": "Commutativity (Lack thereof)",
        "description": "In normal math, 2x3 is the same as 3x2. In matrix math, this is NOT true. A*B is almost never equal to B*A. Therefore, matrix multiplication is 'non-commutative'.",
        "example": "You cannot simply swap the order of matrices in an equation."
      },
      {
        "term": "Transpose of a Matrix",
        "description": "Transposing a matrix means flipping it over its main diagonal. The rows become columns, and the columns become rows. It is denoted by a superscript T (e.g., A^T).",
        "example": "If A = [[1, 2], [3, 4]], then A^T = [[1, 3], [2, 4]]."
      },
      {
        "term": "Trace of a Matrix",
        "description": "The trace is a simple concept for square matrices. It is just the sum of the elements on the main diagonal. It provides useful information about eigenvalues.",
        "example": "For [[1, 2], [3, 4]], the Trace is 1 + 4 = 5."
      },
      {
        "term": "Powers of a Matrix",
        "description": "Just like you can say 'x squared', you can have 'Matrix A squared'. This means A multiplied by itself (A * A). This is only possible for square matrices.",
        "example": "A^2 = A * A; A^3 = A * A * A."
      },
      {
        "term": "Matrix Polynomials",
        "description": "A matrix polynomial is an algebraic expression where the variable 'x' is replaced by a Matrix 'X'. For example, if f(x) = x^2 + 2x, the matrix version is F(A) = A^2 + 2A.",
        "example": "Evaluating a polynomial function using a matrix as the input."
      }
    ]
  },
  {
    "category": "IV. Symmetry and Special Real Matrices",
    "definitions": [
      {
        "term": "Symmetric Matrix",
        "description": "A symmetric matrix is a square matrix that looks the same if you flip it (transpose it). The top-right triangle is a mirror image of the bottom-left triangle across the diagonal.",
        "example": "A = A^T. Example: [[1, 2], [2, 1]]"
      },
      {
        "term": "Skew-Symmetric Matrix",
        "description": "A skew-symmetric matrix is a square matrix where the transpose is equal to the negative of the original matrix (A^T = -A). A key property is that all elements on the main diagonal MUST be zero.",
        "example": "[[0, 2], [-2, 0]]"
      },
      {
        "term": "Orthogonal Matrix",
        "description": "An orthogonal matrix is a special square matrix where its columns (and rows) are perpendicular to each other and have a length of 1. If you multiply an orthogonal matrix by its transpose, you get the Identity matrix.",
        "example": "A * A^T = Identity Matrix."
      },
      {
        "term": "Idempotent Matrix",
        "description": "An idempotent matrix is a matrix that doesn't change when you multiply it by itself. If you square it, you just get the original matrix back.",
        "example": "A^2 = A."
      },
      {
        "term": "Involutory Matrix",
        "description": "An involutory matrix is a matrix that is its own inverse. If you multiply it by itself, you get the Identity matrix.",
        "example": "A^2 = Identity Matrix."
      },
      {
        "term": "Nilpotent Matrix",
        "description": "A nilpotent matrix is a matrix that becomes the Zero Matrix when raised to a certain power. It eventually 'kills' itself through multiplication.",
        "example": "A^k = 0 for some integer k."
      }
    ]
  },
  {
    "category": "V. Determinants",
    "definitions": [
      {
        "term": "Definition of Determinant",
        "description": "The determinant is a single specific number (scalar) calculated from a square matrix. It tells us strictly useful things about the matrix, such as the volume scaling factor of the transformation and whether the matrix can be inverted.",
        "example": "For a 2x2 matrix [[a, b], [c, d]], the determinant is (ad - bc)."
      },
      {
        "term": "Minors",
        "description": "A minor is the determinant of a smaller matrix obtained by deleting one specific row and one specific column from the original matrix.",
        "example": "To find Minor M_11, you delete row 1 and column 1, then calculate the determinant of what is left."
      },
      {
        "term": "Cofactors",
        "description": "A cofactor is just the Minor with a specific sign attached (positive or negative) depending on its position on the grid. It is used to calculate the full determinant or the inverse.",
        "example": "C_ij = (-1)^(i+j) * Minor_ij."
      },
      {
        "term": "Laplace Expansion (Cofactor Expansion)",
        "description": "This is a method to calculate the determinant of large matrices (3x3 or bigger). You pick any row or column, multiply each element by its Cofactor, and sum them up.",
        "example": "Expanding along the first row to find the determinant."
      },
      {
        "term": "Reflection Property of Determinants",
        "description": "This property states that the determinant of a matrix remains exactly the same if you swap its rows with its columns (transpose it).",
        "example": "Det(A) = Det(A^T)."
      },
      {
        "term": "Row/Column Switching Properties",
        "description": "If you swap any two rows (or two columns) of a matrix, the value of the determinant flips its sign (e.g., from 5 to -5).",
        "example": "Swapping Row 1 and Row 2 changes the sign of the determinant."
      },
      {
        "term": "Singular Matrix",
        "description": "A singular matrix is a square matrix that has a determinant of zero. This means it does not have an inverse and it 'squashes' space into a lower dimension.",
        "example": "Det(A) = 0 implies A is singular."
      },
      {
        "term": "Non-Singular Matrix",
        "description": "A non-singular matrix is one where the determinant is NOT zero. This guarantees that the matrix has an inverse and represents a unique solvable system.",
        "example": "Det(A) is not equal to 0."
      }
    ]
  },
  {
    "category": "VI. Inverse and Rank",
    "definitions": [
      {
        "term": "Adjoint (Adjugate) Matrix",
        "description": "The adjoint matrix is the transpose of the cofactor matrix. It is a crucial step in the classical formula for finding the inverse of a matrix.",
        "example": "Adj(A) = (Cofactor Matrix of A)^T."
      },
      {
        "term": "Inverse of a Matrix",
        "description": "The inverse of a matrix A (written as A^-1) is a unique matrix that, when multiplied by A, results in the Identity matrix. It is like the reciprocal of a number (like 1/x).",
        "example": "A * A^-1 = Identity Matrix."
      },
      {
        "term": "Invertible Matrix Theorem",
        "description": "This is a major theorem that connects many concepts. It states that if a matrix is invertible, then its determinant is non-zero, its rank is full, and its null space contains only the zero vector.",
        "example": "If Det(A) is not 0, A is invertible."
      },
      {
        "term": "Elementary Row Operations (EROs)",
        "description": "These are three allowed moves you can make to a matrix to solve equations without changing the solution: 1. Swap two rows. 2. Multiply a row by a non-zero number. 3. Add a multiple of one row to another row.",
        "example": "Replacing Row 2 with (Row 2 - 2*Row 1)."
      },
      {
        "term": "Elementary Column Operations",
        "description": "These are the same as row operations, but applied to columns. They are used less frequently for solving equations but are useful for calculating determinants.",
        "example": "Swapping Column 1 and Column 2."
      },
      {
        "term": "Row Echelon Form (REF)",
        "description": "A matrix is in REF when it looks like a staircase. The leading non-zero number in each row is to the right of the leading number in the row above it, and all rows of pure zeros are at the bottom.",
        "example": "Used as an intermediate step in Gaussian elimination."
      },
      {
        "term": "Reduced Row Echelon Form (RREF)",
        "description": "RREF is a stricter version of REF. In RREF, the leading number in every row must be a 1, and it must be the ONLY non-zero number in its entire column. This gives the direct solution to a system of equations.",
        "example": "The final goal of Gauss-Jordan elimination."
      },
      {
        "term": "Rank of a Matrix",
        "description": "The rank is the number of 'independent' rows or columns in a matrix. It tells you the true information content of the matrix. If a row is just a copy or a sum of other rows, it doesn't add to the rank.",
        "example": "A 3x3 matrix with one row being all zeros has a rank of at most 2."
      },
      {
        "term": "Nullity",
        "description": "Nullity is the dimension of the null space. Put simply, it's the number of free variables in the solution to the equation Ax = 0. The Rank plus the Nullity equals the total number of columns.",
        "example": "If Rank is 2 and Columns are 3, Nullity is 1."
      }
    ]
  },
  {
    "category": "VII. Systems of Linear Equations",
    "definitions": [
      {
        "term": "Matrix Representation (AX = B)",
        "description": "We can write a massive system of linear equations as a single matrix equation: AX = B. Here, 'A' is the matrix of coefficients, 'X' is the column of variables (x, y, z), and 'B' is the column of constants.",
        "example": "Converting 2x + 3y = 5 into matrix form."
      },
      {
        "term": "Homogeneous Systems",
        "description": "A system is homogeneous if all the equations equal zero (AX = 0). These systems always have at least one solution (the trivial solution where all variables are zero).",
        "example": "2x + y = 0."
      },
      {
        "term": "Non-Homogeneous Systems",
        "description": "A system where the equations equal some non-zero constants (AX = B, where B is not zero). These systems might have a unique solution, infinite solutions, or no solution at all.",
        "example": "2x + y = 10."
      },
      {
        "term": "Augmented Matrix",
        "description": "To solve a system AX = B, we stick the B column onto the side of the A matrix to create a combined matrix. This allows us to perform row operations on both sides of the equations simultaneously.",
        "example": "[ A | B ]"
      },
      {
        "term": "Consistency of Systems",
        "description": "A system is 'consistent' if it has at least one valid solution. It is 'inconsistent' if there is no possible solution (e.g., the equations contradict each other, like x=2 and x=5).",
        "example": "Parallel lines represent an inconsistent system (they never meet)."
      },
      {
        "term": "Gaussian Elimination",
        "description": "An algorithm where we use row operations to turn a matrix into Row Echelon Form (REF). Once in REF, we can solve the variables easily using back-substitution.",
        "example": "Transforming the matrix to get zeros below the diagonal."
      },
      {
        "term": "Gauss-Jordan Elimination",
        "description": "An extension of Gaussian elimination where we keep going until the matrix is in Reduced Row Echelon Form (RREF). This isolates every variable directly, giving the final answer without needing back-substitution.",
        "example": "Transforming the matrix until the left side becomes the Identity matrix."
      },
      {
        "term": "Cramer's Rule",
        "description": "A formula for solving systems of equations using determinants. It is elegant for small systems but very inefficient for large ones.",
        "example": "x = Det(Ax) / Det(A)."
      }
    ]
  },
  {
    "category": "VIII. Vector Spaces and Linear Transformations",
    "definitions": [
      {
        "term": "Column Space (Range)",
        "description": "The column space is the set of all possible vectors that can be created by taking linear combinations of the columns of a matrix. It represents all the possible 'outputs' of the matrix transformation.",
        "example": "The span of the column vectors."
      },
      {
        "term": "Row Space",
        "description": "The row space is the set of all possible combinations of the row vectors. Interestingly, the dimension of the row space is always equal to the dimension of the column space (this is the Rank).",
        "example": "The span of the row vectors."
      },
      {
        "term": "Null Space (Kernel)",
        "description": "The null space is the set of all input vectors 'x' that the matrix crushes to zero (i.e., all x such that Ax = 0).",
        "example": "If a matrix flattens 3D space to 2D, the Null Space is the line that got flattened."
      },
      {
        "term": "Rank-Nullity Theorem",
        "description": "A fundamental theorem stating that for any matrix, the Rank (dimension of the output) plus the Nullity (dimension crushed to zero) equals the total number of columns (dimension of the input).",
        "example": "Rank + Nullity = n."
      },
      {
        "term": "Basis and Dimension",
        "description": "A basis is a minimum set of vectors needed to construct a whole space. The 'Dimension' is simply the count of how many vectors are in that basis set.",
        "example": "The standard basis for 2D space is vectors [1,0] and [0,1]. The dimension is 2."
      },
      {
        "term": "Change of Basis Matrix",
        "description": "A matrix used to translate coordinates from one coordinate system (basis) to another. It acts like a translator between two different languages of vector representation.",
        "example": "Converting coordinates from a rotated grid back to the standard grid."
      },
      {
        "term": "Linear Transformations",
        "description": "A function that maps vectors to vectors while preserving vector addition and scalar multiplication. Every matrix represents a linear transformation (like rotation, scaling, or shearing).",
        "example": "Rotating a vector by 90 degrees is a linear transformation."
      }
    ]
  },
  {
    "category": "IX. Eigenvalues and Eigenvectors",
    "definitions": [
      {
        "term": "Eigenvalue Problem (Ax = lambda x)",
        "description": "For a square matrix A, we look for special non-zero vectors 'x' that do not change direction when multiplied by A. They only stretch or shrink. The scaling factor 'lambda' is the eigenvalue.",
        "example": "If Ax = 3x, then 3 is the eigenvalue and x is the eigenvector."
      },
      {
        "term": "Characteristic Equation",
        "description": "To find eigenvalues, we solve the equation det(A - lambda*I) = 0. This is a polynomial equation whose roots are the eigenvalues of the matrix.",
        "example": "Solving lambda^2 - 3*lambda + 2 = 0 to find eigenvalues."
      },
      {
        "term": "Spectrum of a Matrix",
        "description": "The spectrum is simply the set of all eigenvalues of a matrix. It's called a spectrum because it characterizes the 'frequencies' or natural behaviors of the system.",
        "example": "If eigenvalues are 2 and 5, the spectrum is {2, 5}."
      },
      {
        "term": "Algebraic Multiplicity",
        "description": "This is the number of times a specific eigenvalue appears as a root in the characteristic equation. If the equation is (x-2)(x-2) = 0, the eigenvalue 2 appears twice.",
        "example": "Eigenvalue 2 has an algebraic multiplicity of 2."
      },
      {
        "term": "Geometric Multiplicity",
        "description": "This is the number of independent eigenvectors associated with a single eigenvalue. It represents the dimension of the 'eigenspace' for that value. It is always less than or equal to algebraic multiplicity.",
        "example": "If eigenvalue 2 has only 1 independent eigenvector, its geometric multiplicity is 1."
      },
      {
        "term": "Cayley-Hamilton Theorem",
        "description": "A famous theorem stating that every square matrix satisfies its own characteristic equation. If you plug the matrix A into its own polynomial, the result is the Zero Matrix.",
        "example": "If p(x) = x^2 - x, then A^2 - A = 0."
      },
      {
        "term": "Similarity of Matrices",
        "description": "Two matrices A and B are similar if they represent the exact same linear transformation but expressed in different bases. They share the same eigenvalues.",
        "example": "B = P^-1 * A * P."
      },
      {
        "term": "Diagonalization",
        "description": "The process of factoring a matrix A into a form PDP^-1, where D is a diagonal matrix containing the eigenvalues. This makes computing powers of the matrix (A^100) incredibly easy.",
        "example": "Converting a complex matrix into a simple diagonal one."
      },
      {
        "term": "Defective Matrices",
        "description": "A matrix is defective if it does not have enough independent eigenvectors to form a complete basis. These matrices cannot be diagonalized.",
        "example": "A matrix where geometric multiplicity < algebraic multiplicity."
      }
    ]
  },
  {
    "category": "X. Matrix Factorizations (Decompositions)",
    "definitions": [
      {
        "term": "LU Decomposition",
        "description": "A method of breaking a matrix A into two parts: a Lower triangular matrix (L) and an Upper triangular matrix (U). This is the computer's preferred way to solve systems of linear equations efficiently.",
        "example": "A = L * U."
      },
      {
        "term": "QR Decomposition",
        "description": "Factoring a matrix A into an Orthogonal matrix (Q) and an Upper triangular matrix (R). This is widely used in calculating eigenvalues and solving least-squares problems.",
        "example": "A = Q * R."
      },
      {
        "term": "Cholesky Decomposition",
        "description": "A specialized, highly efficient decomposition for symmetric, positive-definite matrices. It factors A into a lower triangular matrix L and its transpose.",
        "example": "A = L * L^T."
      },
      {
        "term": "Singular Value Decomposition (SVD)",
        "description": "The most powerful decomposition in linear algebra. It breaks ANY matrix (even rectangular ones) into three parts representing rotation, scaling, and rotation. It is the foundation of data compression and machine learning (PCA).",
        "example": "A = U * Sigma * V^T."
      },
      {
        "term": "Spectral Decomposition",
        "description": "Also known as Eigendecomposition. It breaks a symmetric matrix into a combination of its eigenvalues and eigenvectors.",
        "example": "A = Q * D * Q^T (for symmetric matrices)."
      }
    ]
  },
  {
    "category": "XI. Complex Matrices",
    "definitions": [
      {
        "term": "Conjugate Matrix",
        "description": "A matrix formed by taking the complex conjugate of every element in the original matrix. This means changing the sign of the imaginary part (replacing i with -i).",
        "example": "If element is 3+4i, the conjugate is 3-4i."
      },
      {
        "term": "Tranjugate (Conjugate Transpose)",
        "description": "This operation involves two steps: first, transposing the matrix (swapping rows and columns), and second, taking the complex conjugate of every element. It is denoted by A^* or A^H.",
        "example": "The complex version of the standard transpose."
      },
      {
        "term": "Hermitian Matrix",
        "description": "A Hermitian matrix is the complex equivalent of a symmetric matrix. It is a square matrix that is equal to its own Conjugate Transpose. The diagonal elements must always be real numbers.",
        "example": "A = A^H."
      },
      {
        "term": "Skew-Hermitian Matrix",
        "description": "A matrix where the Conjugate Transpose is equal to the negative of the original matrix. The diagonal elements must be either zero or purely imaginary.",
        "example": "A^H = -A."
      },
      {
        "term": "Unitary Matrix",
        "description": "A Unitary matrix is the complex equivalent of an orthogonal matrix. Its inverse is equal to its Conjugate Transpose. It preserves lengths in complex vector spaces.",
        "example": "A^-1 = A^H."
      },
      {
        "term": "Normal Matrix",
        "description": "A matrix is normal if it commutes with its own Conjugate Transpose. Both Hermitian and Unitary matrices are specific examples of normal matrices.",
        "example": "A * A^H = A^H * A."
      }
    ]
  },
  {
    "category": "XII. Advanced & Applied Topics",
    "definitions": [
      {
        "term": "Quadratic Forms",
        "description": "A quadratic form is a function that takes a vector and outputs a scalar number, involving squares of variables (like x^2 + xy + y^2). Matrices are used to represent these functions cleanly.",
        "example": "x^T * A * x."
      },
      {
        "term": "Positive Definite Matrices",
        "description": "A symmetric matrix is positive definite if, for any non-zero vector x, the quadratic form x^T * A * x is always positive. In calculus, this corresponds to a 'minimum' point (like a bowl shape).",
        "example": "All eigenvalues are strictly positive."
      },
      {
        "term": "Positive Semi-definite Matrices",
        "description": "Similar to positive definite, but the result can be positive or zero (non-negative). It essentially means the 'bowl' might have a flat bottom.",
        "example": "All eigenvalues are greater than or equal to zero."
      },
      {
        "term": "Jordan Canonical Form",
        "description": "The 'closest we can get' to a diagonal matrix for defective matrices. It consists of Jordan blocks on the diagonal with 1s immediately above the diagonal.",
        "example": "Used to classify similar matrices that cannot be diagonalized."
      },
      {
        "term": "Hessian Matrix",
        "description": "A square matrix of second-order partial derivatives of a scalar function. It describes the local curvature of a function of many variables. It is used in optimization to find max/min points.",
        "example": "A matrix containing d^2f/dxdy, etc."
      },
      {
        "term": "Jacobian Matrix",
        "description": "A matrix of all first-order partial derivatives of a vector-valued function. It represents the 'best linear approximation' of a differentiable function near a given point.",
        "example": "Used in multivariable calculus for change of variables."
      },
      {
        "term": "Block Matrices",
        "description": "A block matrix is a matrix that is interpreted as being broken into sections called blocks or submatrices. We can perform math on these blocks as if they were single numbers.",
        "example": "A matrix made up of smaller matrices."
      },
      {
        "term": "Tensors",
        "description": "A tensor is a generalization of scalars, vectors, and matrices to higher dimensions. A scalar is rank-0, a vector is rank-1, a matrix is rank-2, and a tensor can be rank-3 or higher (like a 3D cube of numbers).",
        "example": "Used in physics and deep learning (TensorFlow)."
      }
    ]
  }
]

