let ID = 1;
let USER_DATA = [
    /** 
     * ```ts
     * type USER = {
     *    ID: number,
     *    name: string,
     *    age: number,
     *    grade: string,
     *    degree: string,
     *    email: string
     * }
     * ``` 
     * */
]

const form = document.querySelector(".main-form");
const search = document.querySelector(".search-form");
const table = document.querySelector(".student-data tbody");
const button = document.querySelector(".main-form input[type='submit']");
let tempRow, tempId = -1;

function createUserDataRow(data) {
    const template = document.createElement("template");

    template.innerHTML = `
    <tr>
        <td>${data.ID}</td>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.age}</td>
        <td>${data.grade}</td>
        <td>
            <span>${data.degree}</span>

            <div>
                <button type="button" class="edit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                                
                </button>
                <button type="button" class="delete">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                              
                </button>
            </div>
        </td>
    </tr>`

    // returning second child. beacuse first child is TextNode
    return template.content.childNodes[1];
}

// When user trying to add data
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target[0].value;
    const email = event.target[1].value;
    const grade = event.target[2].value;
    const age = event.target[3].value;
    const degree = event.target[4].value;

    if (!name || !email || !grade || !age || !degree) {
        alert("Please fill all input fields.");
        return;
    }

    const DATA = {
        name: name,
        email: email,
        grade: grade,
        age: age,
        degree: degree
    }
    
    const inputText = (a,b,c,d,e) => {
        event.target[0].value = a;
        event.target[1].value = b;
        event.target[2].value = c;
        event.target[3].value = d;
        event.target[4].value = e;
    }

    if (tempId != -1) {
        editUser(DATA);
        tempId = -1;
        inputText('','','','','');
        button.value = 'Add Student';
        return;
    }

    DATA.ID = ID++;
    USER_DATA.push(DATA)

    const userId = ID - 1;
    const userRow = createUserDataRow(USER_DATA[USER_DATA.length-1]);

    userRow.querySelector(".edit").onclick = () => {
        tempId = userId;
        tempRow = userRow;

        button.value = 'Update Student';
        inputText(name,email,grade,age,degree);
    }

    userRow.querySelector(".delete").onclick = () => {
        USER_DATA = USER_DATA.filter(e => e.ID != userId);
        userRow.parentNode.removeChild(userRow);
    }

    table.appendChild(userRow);
    inputText('','','','','');
});

const editUser = (data) => {
    const DATA = USER_DATA.findIndex(e => e.ID = tempId);
    DATA.degree = data.degree;

    const rows = tempRow.querySelectorAll("td");
    rows[1].textContent = (DATA.name = data.name);
    rows[2].textContent = (DATA.email = data.email);
    rows[3].textContent = (DATA.age = data.age)
    rows[4].textContent = (DATA.grade = data.grade)

    tempRow.querySelector("span").textContent = (DATA.degree = data.degree);
    tempRow = null;
} 