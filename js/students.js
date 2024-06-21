document.addEventListener("DOMContentLoaded", setUpStudentsPage);

async function setUpStudentsPage() {
    const studentForm = document.querySelector("#student-form");
    let dniInput = document.querySelector("#dni-input");
    let nameInput = document.querySelector("#name-input");
    let lastnameInput = document.querySelector("#lastname-input");
    let comissionInput = document.querySelector("#comission-input");
    let emailInput = document.querySelector("#email-input");
    let quantityInput = document.querySelector("#quantity-input");
    const addBtn = document.querySelector("#add-btn");
    const addMultBtn = document.querySelector("#add-mult-btn");
    const addStudentsBtn = document.querySelector("#add-students-btn");
    const backBtn = document.querySelector("#back-btn");
    const multAddDialog = document.querySelector('#mult-add-dialog');
    const studentDialog = document.querySelector('#student-dialog');
    const studentDialogText = document.querySelector('#student-dialog-text')
    const messageDialog = document.querySelector('#message-dialog');
    const message = document.querySelector('#message');
    const deleteDialog = document.querySelector('#delete-dialog');
    const deleteMessage = document.querySelector('#delete-message');
    const closeDeleteBtn = document.querySelector('#close-delete-btn');
    const acceptDeleteBtn = document.querySelector('#accept-delete-btn');
    const studentDialogCloseBtn = document.querySelector('#close-btn');
    const messageDialogCloseBtn = document.querySelector('#close-message-btn');
    const paginatorSelect = document.querySelector('#paginator-select')
    const paginatorPreviousBtn = document.querySelector('#previous-btn');
    const paginatorNextBtn = document.querySelector('#next-btn');
    const pageNumberMessage = document.querySelector('#page-number');

    const BASE_URL = new URL('https://667084cf0900b5f8724aedcb.mockapi.io/api/students');
    let studentsData;
    let paginatorPage = 1;
    let newStudent = {};
    let studentToDelete;

    studentForm.addEventListener('submit', handleSubmit);
    addBtn.addEventListener('click', openAddStudentDialog);
    addMultBtn.addEventListener('click', () => {
        multAddDialog.showModal();
    });
    addStudentsBtn.addEventListener('click', handleMultiAdd);
    backBtn.addEventListener('click', () => {
        multAddDialog.close();
    });
    studentDialogCloseBtn.addEventListener('click', () => {
        newStudent = {};
        setDataToForm();
        studentDialog.close();
    });
    messageDialogCloseBtn.addEventListener('click', () => {
        messageDialog.close();
    });
    closeDeleteBtn.addEventListener('click', () => {
        deleteDialog.close();
    });
    acceptDeleteBtn.addEventListener('click', handleDelete);

    paginatorSelect.addEventListener("change", () => {
        paginatorPage = 1;
        disableBtn(paginatorPreviousBtn);
        fetchAndPopulate();
    });
    paginatorPreviousBtn.addEventListener('click', handlePreviousBtn);
    paginatorNextBtn.addEventListener('click', handleNextBtn);

    function handlePreviousBtn() {
        enableBtn(paginatorNextBtn);
        if(paginatorPage > 1) {
            enableBtn(paginatorPreviousBtn);
            paginatorPage--;
            if(paginatorPage == 1) {
                disableBtn(paginatorPreviousBtn);
            }
            fetchAndPopulate();
        } else {
            disableBtn(paginatorPreviousBtn);
        }
    }

    function handleNextBtn() {
        enableBtn(paginatorPreviousBtn);
        paginatorNextBtn.disabled = (studentsData.length == paginatorSelect.value) ?  false : true;
        if(!paginatorNextBtn.disabled) {
            paginatorPage++;
            fetchAndPopulate();
        }
    }

    function disableBtn(btn) {
        btn.disabled = true;
        btn.classList.add("disabled");
    }

    function enableBtn(btn) {
        btn.disabled = false;
        btn.classList.remove("disabled");
    }

    async function fetchData() {
        try{
            deleteSearchParams();
            BASE_URL.searchParams.append('sortBy', 'name');
            BASE_URL.searchParams.append('page', paginatorPage);
            BASE_URL.searchParams.append('limit', paginatorSelect.value);
            let response = await fetch(BASE_URL);
            return await response.json()
        } catch (error) {
            showMessage(error);
            disableBtn(paginatorNextBtn);
            disableBtn(paginatorPreviousBtn);
        }
    }

    async function addStudent(elementsToAdd) {
        try{
            deleteSearchParams();
            let response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(elementsToAdd)
            });
            return response
        } catch (error) {
            showMessage(error);
        }
    }

    async function editStudent() {
        try{
            deleteSearchParams();
            let response = await fetch(`${BASE_URL}/${newStudent.id}`, {
                method: 'PUT',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newStudent)
            });
            return response
        } catch (error) {
            showMessage(error);
        }
    }

    async function deleteStudent(studentId) {
        try{
            deleteSearchParams();
            let response = await fetch(`${BASE_URL}/${studentId}`, {
                method: 'DELETE',
            });
            return response
        } catch (error) {
            showMessage(error);
        }
    }

    function deleteSearchParams() {
        BASE_URL.searchParams.delete('sortBy');
        BASE_URL.searchParams.delete('page');
        BASE_URL.searchParams.delete('limit');
    }

    function populateTable() {
        let tableContent = document.querySelector('.table-content');
        tableContent.innerHTML = '';
        let newRow;
        let newColumn;
        let attribute;
        if(studentsData.length) {
            for (let index = 0; index < studentsData.length; index++) {
                newRow = document.createElement('tr');
                for (let column = 0; column < TABLE_COLUMNS; column++){
                    attribute = STUDENT_ATTRIBUTES[column];
                    newColumn = document.createElement('td');
                    newColumn.innerHTML = studentsData[index][attribute];
                    newRow.appendChild(newColumn);
                }
                newRow.appendChild(createEditColumn());
                newRow.appendChild(createDeleteColumn());
                tableContent.appendChild(newRow);
            }
            addBtnsActions();
        }
    }

    function createEditColumn() {
        let newIcon = document.createElement("img");
        newIcon.classList.add("edit-btn");
        newIcon.classList.add("icon");
        newIcon.src = "assets/icons/edit.svg";

        newColumn = document.createElement('td');
        newColumn.appendChild(newIcon); 
        return newColumn;
    }

    function createDeleteColumn() {
        let newIcon = document.createElement("img");
        newIcon.classList.add("delete-btn");
        newIcon.classList.add("icon");
        newIcon.src = "assets/icons/delete.svg";

        newColumn = document.createElement('td');
        newColumn.appendChild(newIcon); 
        return newColumn;
    }

    function addBtnsActions() {
        let editBtns = document.querySelectorAll(".edit-btn");
        for(let btn of editBtns){
            btn.addEventListener('click', openEditStudentDialog)
        }
        let deleteBtns = document.querySelectorAll(".delete-btn");
        for(let btn of deleteBtns){
            btn.addEventListener('click', openDeleteConfirmationDialog)
        }
    }
    
    function openEditStudentDialog() {
        let mail = this.parentElement.parentElement.children[MAIL_COLUMN].innerHTML;
        newStudent = studentsData.filter(elem => elem.mail == mail)[0];
        setDataToForm(newStudent);
        studentDialogText.innerHTML = "Editar alumno";
        studentDialog.showModal();
    }

    function openAddStudentDialog() {
        studentDialogText.innerHTML = "Agregar alumno";
        studentDialog.showModal();
    }

    function setDataToForm(data) {
        dniInput.value = data ? data.dni : null;
        nameInput.value = data ? data.name : null;
        lastnameInput.value = data ? data.lastname : null;
        comissionInput.value = data ? data.comission : null;
        emailInput.value = data ? data.mail : null;
    }

    function getStudentDataFromForm() {
        newStudent.dni = dniInput.value;
        newStudent.name = nameInput.value;
        newStudent.lastname = lastnameInput.value;
        newStudent.comission = comissionInput.value;
        newStudent.mail = emailInput.value;
    }

    function showMessage(msg) {
        message.innerHTML = msg;
        messageDialog.showModal();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(newStudent).length > 0) {
            getStudentDataFromForm();
            handleEdit();
        } else {
            getStudentDataFromForm();
            handleAdd(newStudent);
        }
    }

    async function handleEdit() {
        let response = await editStudent();
        studentDialog.close();
        newStudent = {};
        setDataToForm();
        if (response.ok){
            showMessage("Alumno editado correctamente.");
            fetchAndPopulate();
        } else {
            showMessage("Ocurrió un error al editar al alumno. Por favor intente nuevamente.");
        }
    }

    async function handleAdd(student) {
        let response = await addStudent(student);
        studentDialog.close();
        setDataToForm();
        if (response.ok){
            showMessage("Alumno/s agregado/s correctamente.");
            paginatorPage = 1;
            disableBtn(paginatorPreviousBtn);
            fetchAndPopulate();
        } else {
            showMessage("Ocurrió un error al agregar al/los alumno/s. Por favor intente nuevamente.");
        }
    }

    async function fetchAndPopulate() {
        studentsData = await fetchData();
        pageNumberMessage.innerHTML = `Pagina ${paginatorPage} - ${studentsData.length} elementos`;
        studentsData.length < paginatorSelect.value ? disableBtn(paginatorNextBtn) : enableBtn(paginatorNextBtn);
        populateTable();
    }

    function openDeleteConfirmationDialog() {
        let mail = this.parentElement.parentElement.children[MAIL_COLUMN].innerHTML;
        studentToDelete = studentsData.filter(elem => elem.mail == mail)[0];
        openConfirmationDialog(studentToDelete);
    }

    function openConfirmationDialog(student) {
        deleteDialog.showModal();
        deleteMessage.innerHTML = `Está seguro que desea borrar a ${student.name} ${student.lastname} con DNI ${student.dni}?`
    }

    async function handleDelete() {
        deleteDialog.close();
        let response = await deleteStudent(studentToDelete.id);
        if (response.ok){
            showMessage("Alumno borrado correctamente.");
            fetchAndPopulate();
        } else {
            showMessage("Ocurrió un error al borrar al alumnto. Por favor intente nuevamente.");
        }
    }

    function handleMultiAdd(e) {
        e.preventDefault();
        multAddDialog.close();
        let newStudents = generateStudentsData(quantityInput.value);
        newStudents.forEach(student => handleAdd(student))
        quantityInput.value = null;
    }

    function generateStudentsData(quantity) {
        let fakeData = [];
        for (let studentQuantity = 0; studentQuantity < quantity; studentQuantity++) {
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

    fetchAndPopulate();
}