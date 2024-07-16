
let solutions = document.getElementById('solutions');
solutions.addEventListener('click', () => {

    solutions.disabled = true;
    let n = parseInt(document.getElementById('row').value);
    function topLeft(ar, i, j) {
        //it will check diagonal as 
        //22
        //  11
        //      00


        while (i >= 0 && j >= 0) {

            if (ar[i][j] == 1) return true;

            i--;
            j--;
        }

        return false;
    }

    function topRight(ar, i, j) {


        while (i >= 0 && j < n) {
            if (ar[i][j] == 1) return true;

            i--;
            j++;
        }

        return false;
    }


    function bottomLeft(ar, i, j) {


        while (i < n && j >= 0) {
            if (ar[i][j] == 1) return true;

            i++;
            j--;
        }

        return false;
    }

    function bottomRight(ar, i, j) {
        //it will check diagonal as 

        //22
        //  33

        while (i < n && j < n) {
            if (ar[i][j] == 1) return true;

            i++;
            j++;
        }

        return false;
    }


    function isSafe(ar, i, j) {

        //check into rows & columns
        for (let k = 0; k < n; k++) {



            if (ar[i][k] == 1) return false;
            // tempId2.innerText = '0';

            if (ar[k][j] == 1) return false;
        }

        //check into diagonals
        if (topLeft(ar, i, j)) return false;
        if (topRight(ar, i, j)) return false;
        if (bottomLeft(ar, i, j)) return false;
        if (bottomRight(ar, i, j)) return false;

        return true;
    }

    function helper(ar, i) {
        if (i == n) {
            createAnswer(ar);
            return true;
        }

        for (let j = 0; j < n; j++) {
            if (isSafe(ar, i, j)) {
                ar[i][j] = 1;
                helper(ar, i + 1)
                ar[i][j] = 0;

            }
        }

        return false;
    }

    let m = document.querySelector('main');
    let ar = [[]];
    for (let i = 0; i < n; i++) {
        ar[i] = new Array();
        for (let j = 0; j < n; j++) {
            ar[i][j] = 0;
        }
    }

    helper(ar, 0);
    function createAnswer(ar) {
        console.log(ar);
        let container = document.createElement('div');
        container.setAttribute('id', 'container');

        m.appendChild(container);
        for (let i = 0; i < n; i++) {
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            container.appendChild(row);

            for (let j = 0; j < n; j++) {
                let col = document.createElement('div');
                col.setAttribute('class', 'col');
                col.setAttribute('id', i + "" + j);
                if(ar[i][j] == 1){
                    col.innerText = 'Q';
                    col.style.background = 'yellow';
                }
                row.appendChild(col);
            }
        }
        // countSafeQueens();

    }

    
})