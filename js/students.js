document.addEventListener("DOMContentLoaded", setUpCommissionsPage);

function setUpCommissionsPage() {
    const studentsData = generateStudentsData();
   
    function generateStudentsData() {
        let fakeData = [];
        for (let studentQuantity = 0; studentQuantity < 50; studentQuantity++) {
            let fakeStudent = {
                'dni': generateDNI(),
                'name': generateRandomData(fakeRandomNames),
                'lastname': generateRandomData(fakeRandomLastnames),
                'comission': generateRandomData(fakeRandomComission) + generateRandomData(fakeRandomComissionNumber),
                'mail': generateRandomMail(),
            };
            fakeData.push(fakeStudent);
        }
        return fakeData;
    }

    function generateDNI() {
        let dni = '';
        for (let dniLength = 0; dniLength < 8; dniLength++) {
            dni += Math.floor(Math.random() * 10);
        }
        return dni;
    }

    function generateRandomData(fakeData) {
        return fakeData[Math.floor(Math.random() * fakeData.length)];
    }

    function generateRandomMail() {
        let mail = '';
        const domain = '@example.com';
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const mailLength = 10;
        for (let index = 0; index < mailLength; index++) {
            mail += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        }
        return mail + domain;
    }

    function populateTable() {
        studentsData.sort((a, b) => sortingByName(a, b));
        let tableContent = document.querySelector('.table-content');
        let newRow;
        let newColumn;
        let attribute;
        for (let index = 0; index < studentsData.length; index++) {
            newRow = document.createElement('tr');
            for (let column = 0; column < TABLE_COLUMNS; column++){
                attribute = STUDENT_ATTRIBUTES[column];
                newColumn = document.createElement('td');
                newColumn.innerHTML = studentsData[index][attribute];
                newRow.appendChild(newColumn);
            }
            tableContent.appendChild(newRow);
        }
    }

    function sortingByName(a, b) {
        return (a.name < b.name) ? -1
        : (a.name > b.name) ? 1
        : sortingByLastname(a, b);
    }

    function sortingByLastname(a, b) {
        return (a.lastname < b.lastname) ? -1
        : (a.lastname > b.lastname) ? 1
        : 0
    }

    populateTable();
}