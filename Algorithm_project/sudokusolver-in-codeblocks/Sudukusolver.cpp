#include<iostream>
using namespace std;

void Print(int board[][9], int n)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;
}

bool isValid(int board[][9], int row, int col, int num, int n)
{
    for (int i = 0; i < n; i++)
    {
        if (board[i][col] == num)
            return false;
        if (board[row][i] == num)
            return false;
        if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == num)
            return false;
    }
    return true;
}

bool SudokuSolver(int board[][9], int i, int j, int n)
{   //base case
    if (i == n)
    {
        Print(board, n);
        return true;
    }

    if (j == n)
    {
        return SudokuSolver(board, i + 1, 0, n);
    }

    if (board[i][j] != 0)
    {
        return SudokuSolver(board, i, j + 1, n);
    }

    for (int num = 1; num <= 9; num++)
    {
        if (isValid(board, i, j, num, n))
        {
            board[i][j] = num;
            if(SudokuSolver(board, i, j + 1, n) == true)
             return true;
            else
                //backtracking
            board[i][j] = 0;
        }
    }
    return false;
}

int main()
{
    int n = 9;
    int board[9][9] =
    {
        {0, 0, 7, 1, 0, 0, 0, 6, 0},
        {1, 0, 5, 2, 0, 8, 0, 0, 0},
        {6, 0, 0, 0, 0, 7, 1, 2, 0},
        {3, 1, 2, 4, 0, 5, 0, 0, 8},
        {0, 0, 6, 8, 9, 0, 2, 0, 0},
        {0, 0, 0, 0, 0, 3, 0, 0, 1},
        {0, 0, 1, 0, 0, 4, 9, 8, 6},
        {0, 8, 3, 9, 0, 6, 0, 0, 0},
        {0, 6, 0, 0, 8, 2, 7, 0, 3},
    };

    SudokuSolver(board, 0, 0, n);

    return 0;
}
