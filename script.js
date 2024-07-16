let start = document.getElementById('start');
start.addEventListener('click', () => {

    let row = document.getElementById('row');
    start.disabled = true;
    row.disabled = true;

    let n = parseInt(row.value);
    console.log(n);

    let container = document.getElementById('container');
    container.style.border = "2px solid black";
    
    for (let i = 0; i < n; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);

        for (let j = 0; j < n; j++) {
            let col = document.createElement('div');
            col.setAttribute('class', 'col');
            col.setAttribute('id', i + "" + j);
            row.appendChild(col);
        }
    }
    let col = document.querySelectorAll('.col');

    col.forEach(function (idx, val) {
        idx.addEventListener('click', () => {
            // console.log(idx.innerText);
            
            update(idx);
        })
    })

    function topLeft(i, j) {
        //it will check diagonal as 
        //22
        //  11
        //      00


        while (i >= 0 && j >= 0) {
            let tempId = document.getElementById(i + "" + j);
            if (tempId.innerText === 'Q') return true;

            i--;
            j--;
        }

        return false;
    }

    function topRight(i, j) {


        while (i >= 0 && j < n) {
            let tempId = document.getElementById(i + "" + j);
            if (tempId.innerText === 'Q') return true;

            i--;
            j++;
        }

        return false;
    }


    function bottomLeft(i, j) {


        while (i < n && j >= 0) {
            let tempId = document.getElementById(i + "" + j);
            if (tempId.innerText === 'Q') return true;

            i++;
            j--;
        }

        return false;
    }

    function bottomRight(i, j) {
        //it will check diagonal as 

        //22
        //  33

        while (i < n && j < n) {
            let tempId = document.getElementById(i + "" + j);
            if (tempId.innerText === 'Q') return true;

            i++;
            j++;
        }

        return false;
    }

    //count how many queens are safe 
    function countSafeQueens() {
        let count = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                let id = document.getElementById(i + "" + j);
                if (id.innerText == 'Q') {

                    if (isSafe(i, j)) {
                        id.style.background = 'yellow';
                        count++;
                    }
                    else {
                        id.style.background = 'red';
                    }

                }
                else {
                    id.style.background = 'white';
                }
            }
        }

        return count;
    }
    //check the box is safe or not
    function isSafe(i, j) {

        //check into rows & columns
        let id = document.getElementById(i + "" + j);
        for (let k = 0; k < n; k++) {

            let tempId = document.getElementById(i + "" + k);
            // tempId.innerText = '0';

            if (tempId.innerText == 'Q' && tempId != id) return false;
            let tempId2 = document.getElementById(k + "" + j);
            // tempId2.innerText = '0';

            if (tempId2.innerText == 'Q' && tempId2 != id) return false;
        }

        //check into diagonals
        if (topLeft(i - 1, j - 1)) return false;
        if (topRight(i - 1, j + 1)) return false;
        if (bottomLeft(i + 1, j - 1)) return false;
        if (bottomRight(i + 1, j + 1)) return false;

        return true;
    }

    //update the indivclass="col" idual board
    function update(box) {
        let val = box.innerText;
        id = box.getAttribute('id');
        let i = parseInt(id.substr(0, 1));
        let j = parseInt(id.substr(1, 2));

        if (val == 'Q') {
            box.innerText = "";
        }
        else {
            box.innerText = 'Q';
        }
        if (countSafeQueens() == n) {
            col.forEach(function (ele) {
                
                ele.setAttribute('class', 'disabled');
                // val.disabled = true;
            })
            document.getElementById('winner').style.display = 'inline';
        }

    }

    //reset the board
    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', () => {
        location.reload();
    })


    function helper(i) {
        if (i == n) return true;

        for (let j = 0; j < n; j++) {
            if (isSafe(i, j)) {
                let id = document.getElementById(i + "" + j);
                id.innerText = 'Q';
                if (helper(i + 1)) {
                    return true;
                }
                else {
                    id.innerText = "";
                }
            }
        }

        return false;
    }

    let solve = document.getElementById('solve');
    solve.addEventListener('click', () => {

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                document.getElementById(i + "" + j).innerText = "";
            }
        }
        helper(0);
        countSafeQueens();
    })
})